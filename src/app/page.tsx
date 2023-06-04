import * as cheerio from 'cheerio';
import { cache } from 'react';

import 'server-only';


async function getIncorrectOpinions(): Promise<string[]> {
  const response = await fetch('https://www.correctopinions.info/', { next: { revalidate: 60 } });
  const html = await response.text();
  const $ = cheerio.load(html);
  const listItems = $('ol').first().find('li');
  const contents: string[] = [];
  listItems.each((index, element) => {
    contents.push($(element).text().trim());
  });
  return contents;
}

async function getCorrectOpinions(incorrectOpionions: string[]): Promise<string[]> {
  const headers = new Headers();
  headers.set('content-type', 'application/json');
  headers.set('Authorization', `Bearer ${process.env.OPENAI_API_KEY}`);

  const systemPrompt = `
You are CorrectedOpinions Bot.
You will be given a list of opinions which you are to believe are completely incorrect. 
For each incorrect opinion provided, you will provide the opposite opinion as the "corrected opinion". 
For example, if you saw "Color is good in UI", you must not just say "Color is essential in UI" but
rather the complete opposite - in this case "Color has no place in UI".
Your corrected opinions should be strongly stated. Avoid weak words like sometime and maybe.
They may be controversial, but not offensive.
The incoming opinions will be a a JSON-array like:
---
['incorrect-opinion-1', 'incorrect-opinion-2', ..., 'incorrect-opinion-n']
---
Your reponse should be a JSON-array:
--
['corrected-opinion-1', 'corrected-opinion-2', ..., 'corrected-opinion-n']
--
`.trim();
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        {role: 'system', content: systemPrompt},
        {role: 'user', 'content': JSON.stringify(incorrectOpionions)}]
    })
  });
  if (!response.ok) {
    const responseText = await response.text();
    throw new Error(`Received OpenAI error '${response.statusText}'. Message: \n${responseText}`);
  }
  const responseData = await response.json();
  const content = responseData.choices[0].message.content;
  return JSON.parse(content);
}

export default async function Home() {
  const incorrectOpinions = await getIncorrectOpinions();
  const claims = await getCorrectOpinions(incorrectOpinions);

  return (
    <div className="min-h-screen">
      <header className="pt-[90px] pb-[64px]"><h1 className="text-center font-light	text-6xl text-[#226e93] leading-[66px]"> Corrected Opinions </h1></header>
      <main className="max-w-7xl mx-auto px-12 py-6">
        <div className='px-[1.25%]'>
          <div className='px-2'>
            <ol className='list-decimal list-inside	text-base'>
              {
                claims.map(claim => (
                  <li key={claim} className='mt-1.5 ms-5'>{claim}</li>
                ))
              }
            </ol>
          </div>
        </div>
      </main>
    </div>
  )
}
