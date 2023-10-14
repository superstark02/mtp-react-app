function Graphql(FILMS_QUERY){
    return fetch("https://api.disneyapi.dev/character", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
}

export default Graphql
