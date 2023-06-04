
export default function Home() {
  const claims = [
    "New is always worse",
    "Water should not taste like anything or be fizzy",
    "Chocolate should not be chewed",
    "Prisoner of Azkaban is the worst Harry Potter movie",
    "The most important part of a phone is the headphone jack",
    "All smells are bad",
    "Sweet potato fries are bad",
    "Venting is not allowed in Among Us hide and seek",
    "Mushrooms taste great",
    "Brioche is a bad bread",
    "Spinach is the best leafy green"
  ]
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
