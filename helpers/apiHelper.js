

const apiKeys = {
  yelp:'X0dL6JkQu1HPY_GBOtelCfxSgU3it0hPAOYPy99ciP5qaKNce1-vrh1AD_aI6hqTT5UIJt9Gi5HLlPzclzpCRU63AKi25bf1Fhc128ms3s3wgYxaN6SmRVci28qtXXYx',
  wolfram: '9YR6T5-RYTW4PTK83'
}

const apiUrls = {
  yelp:'https://api.yelp.com/v3/businesses/search',
  wolfram: 'http://api.wolframalpha.com/v2/query'
}

const returnWolframOptions = function(input, parseJson = true){
  let optionsObject = {
    uri: apiUrls.wolfram,
      qs:{
        input: input,
        output: 'json',
        appid: apiKeys.wolfram,
        ignorecase: true,
        podtimeout: '0',
        formattimeout: '0',
        translation: true,
        assumption: `C.${input}-_*Movie`,
        assumption: `C.${input}-_*Book`,
        assumption: `C.${input}-_*FictionalCharacter`
      },
      json:parseJson
  }
  return optionsObject;
}

const returnYelpOptions = function(input, parseJson = true){
  let optionsObject = {
    uri: apiUrls.yelp,
    headers:{
      'Authorization':`Bearer ${apiKeys.yelp}`
    },
    qs:{
      term: input,
      location: 'Toronto',
      categories: 'food',
      limit: 5
    },
    json:parseJson
  }
  return optionsObject;
}



// }


module.exports = {
  returnYelpOptions, returnWolframOptions
}

