// async function setDataFromRemoteApi () {
//   $( '#addAccountLoader' ).show();
//
//   const antyToken = await getAntyTokenFromSystemPrivate();
//   const id = await getAntyProfileIDFromSystemPrivate();
//   const baseURL = await getAntyBaseUrlFromSystemPrivate();
//   const appVersion = await getAntyApiVersionFromSystemPrivate();
//
//   if (antyToken && id && baseURL && appVersion) {
//     fetch(`${baseURL}/browser_profiles/${id}`, {
//       headers: {
//         Authorization: antyToken,
//         'X-Anty-App-Version': appVersion
//       }
//     })
//       .then(response => response.json())
//       .then(({ data }) => {
//         if (data) {
//           $( '#accountNameInput' ).val(data.name);
//
//           if (Array.isArray(data.tags) && data.tags.length) {
//             for (const tag of data.tags) {
//               $(`#tagsSelectInput option[value='${tag}']`).remove();
//               $('#tagsSelectInput').append(`<option value='${tag}'>${tag}</option>`);
//             }
//
//             $('#tagsSelectInput').val(data.tags);
//             $('#tagsSelectInput').trigger('change');
//           }
//
//           if (data.proxy) {
//             const proxies = JSON.parse(localStorage.getItem('Proxies'))
//             const { type, host, port, login, password, changeIpUrl, name } = data.proxy
//
//             for (const proxy of proxies) {
//               if (proxy.ip == host &&
//                 proxy.port == port &&
//                 proxy.login == login &&
//                 proxy.password == password
//               ) {
//                 $('#proxySelectInput').val(proxy.id);
//                 $('#proxySelectInput').trigger('change');
//               } else if (type !== 'ssh') {
//                 $( '#proxyMode .btn-group__item:nth-child(2)' ).click();
//                 let newProxy = `${type}://${host}:${port}`
//                 if (login && password) {
//                   newProxy += `:${login}:${password}`
//                 }
//                 $('#proxyNewInput').val(newProxy).trigger('change');
//                 $('#proxyNewNameInput').val(name);
//
//                 if (changeIpUrl) {
//                   $('#proxyNewSendChangeIpUrlInput').val(changeIpUrl);
//                 }
//               }
//             }
//           }
//         }
//       })
//       .finally(() => {
//         $( '#addAccountLoader' ).hide();
//       });
//   }
// }
export default {
  somme: "",
};
