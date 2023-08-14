import { useFacebookTokenStore } from 'entities/facebook'
import { useForm, UseFormReset } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import PROXY_MODE from '../constants/PROXY_MODE'
import emptyForm from '../static/emptyForm'
import { PostData } from '../typings/account'
import { Form } from '../typings/form'
import getCookies from '../utils/getCookies'
import parseProxy from '../utils/parseProxy'

const useAddAccount = ({
  addAccount,
}: {
  addAccount: ({
    data,
    reset,
  }: {
    data: PostData
    reset: UseFormReset<Form>
  }) => void
}) => {
  const { t } = useTranslation()
  const facebookToken = useFacebookTokenStore((state) => state.token)
  const formMethods = useForm<Form>({
    defaultValues: structuredClone(emptyForm),
  })

  const onSubmit = (form: Form) => {
    const data: PostData = {
      access_token: facebookToken,
      name: form.accountName,
      useragent: form.userAgent,
      tags: form.tags,
      cookies: null,
    }

    if (form.proxyMode === PROXY_MODE.NEW_PROXY) {
      const parsedProxyInfo = parseProxy(form.newProxy)

      if (parsedProxyInfo instanceof Error) {
        return formMethods.setError('newProxy', {
          type: 'validate',
          message: t('validation.required', {
            field: t(`proxy.${parsedProxyInfo.message}`).toLowerCase(),
          }),
        })
      }

      data.proxy = {
        name: form.newProxyName,
        type: parsedProxyInfo.type,
        ip: parsedProxyInfo.host,
        port: parsedProxyInfo.port,
        login: parsedProxyInfo.login,
        password: parsedProxyInfo.password,
        change_ip_url: form.withChangeIpUrl ? form.changeIpUrl : '',
      }
    }

    if (form.proxyMode === PROXY_MODE.SELECT_PROXY && form.selectedProxy) {
      data.proxy = form.selectedProxy
    }

    if (form.sendCookies) {
      getCookies()
        .then((cookies) => {
          addAccount({
            data: { ...data, cookies },
            reset: formMethods.reset,
          })
        })
        .catch(() => {
          addAccount({
            data: { ...data, cookies: null },
            reset: formMethods.reset,
          })
        })
    } else {
      addAccount({
        data,
        reset: formMethods.reset,
      })
    }
  }

  return {
    formMethods,
    onSubmit,
  }
}

export default useAddAccount
