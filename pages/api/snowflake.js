// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function getData(req, res) {
  const response = await fetch(
    `${process.env.NEXT_STEPZEN_API_URL}`,

    {
      method: "POST",

      headers: {
        Authorization: `apikey ${process.env.NEXT_STEPZEN_API_KEY}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        query: `query MyQuery {unsplash_Random_Photo {
          urls {
            full
          }
        }
      }
      `,
      }),
    }
  );

  let data = await response.json();
  //Couldn't set status here. See https://stackoverflow.com/questions/7042340/error-cant-set-headers-after-they-are-sent-to-the-client
  return res.json({ data: data });
}
