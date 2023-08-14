import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import { useDolphinTokenStore } from 'entities/dolphin'
import { useFacebookTokenStore } from 'entities/facebook'
import { FormProvider, UseFormReset } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import Card from 'shared/ui/card'
import { useSnackBarStore } from 'shared/ui/snackBar'

import addAccount from '../api/requests/addAccount'
import useAddAccount from '../lib/hooks/useAddAccount'
import emptyForm from '../lib/static/emptyForm'
import { PostData } from '../lib/typings/account'
import { Form } from '../lib/typings/form'

import AccountName from './AccountName'
import SendCookies from './SendCookies'
import Tags from './Tags'
import UserAgent from './UserAgent'
import Proxy from './proxy/Proxy'

const AddAccountCard = () => {
  const { t } = useTranslation()
  const openSnackBar = useSnackBarStore((state) => state.openSnackBar)
  const dolphinTokenInfo = useDolphinTokenStore((state) => state.tokenInfo)
  const facebookToken = useFacebookTokenStore((state) => state.token)
  const [loading, setLoading] = useState(false)

  const handleAddAccount = ({
    data,
    reset,
  }: {
    data: PostData
    reset: UseFormReset<Form>
  }) => {
    if (!dolphinTokenInfo) {
      return
    }

    setLoading(true)

    addAccount({ ...dolphinTokenInfo, postData: data })
      .then(() => {
        openSnackBar({
          message: t('common.addAccountSuccess'),
          severity: 'success',
        })

        reset({
          ...structuredClone(emptyForm),
          userAgent: data.useragent,
        })
      })
      .catch(() => {
        openSnackBar({
          message: t('common.somethingWentWrong'),
          severity: 'error',
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const { formMethods, onSubmit } = useAddAccount({
    addAccount: handleAddAccount,
  })

  return (
    <Card
      title={t('common.addAccount')}
      cardProps={{
        sx: { mt: 1 },
      }}
    >
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <AccountName />
          <UserAgent />
          <Proxy />
          <SendCookies />
          <Tags />

          <Box sx={{ textAlign: 'center', mt: 1, width: '50%', mx: 'auto' }}>
            <LoadingButton
              type="submit"
              variant="contained"
              disabled={!facebookToken}
              loading={loading}
              sx={{ width: '100%' }}
            >
              {t('common.add')}
            </LoadingButton>
          </Box>
        </form>
      </FormProvider>
    </Card>
  )
}

export default AddAccountCard
