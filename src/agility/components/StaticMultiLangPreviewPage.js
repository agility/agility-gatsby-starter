const StaticMultiLangPreviewPage = ({ pageContext }) => {
  if (typeof window !== `undefined`) {
    const requestedLangCode = getParameterByName({
      name: "lang",
      url: window.location.href,
    })

    const { languages } = pageContext

    languages.map(language => {
      if (language.code === requestedLangCode) {
        window.location = `/${language.path}${window.location.pathname}`
        return null
      }
    })
  }
}

const getParameterByName = ({ name, url }) => {
  if (!url) url = window.location.href
  name = name.replace(/[[\]]/g, "\\$&")
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ""
  return decodeURIComponent(results[2].replace(/\+/g, " "))
}

export default StaticMultiLangPreviewPage
