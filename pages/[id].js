const product = {
  name: 'Creed III',
  releaseDate: 'April 15, 2021',
  images: [
    {
      id: 1,
      imageSrc:
        'http://image.tmdb.org/t/p/w220_and_h330_face/cvsXj3I9Q2iyyIo95AecSd1tad7.jpg',
      imageAlt: 'poster',
      primary: true,
    },
  ],
  description: `
    <p>The description for the movie goes here</p>
  `,
}

function MovieDetails() {
  return (
    <div className="bg-white">
      <div className="pb-16 sm:pb-24">
        <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="flex justify-between">
                <h1 className="text-xl font-medium text-gray-900">
                  {product.name}
                </h1>
              </div>
              <div className="mt-4">
                <div className="flex items-center">
                  <p className="text-sm text-gray-700">{product.releaseDate}</p>
                </div>
              </div>
            </div>

            {/* Image gallery */}
            <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
              <div className="grid grid-cols-1">
                {product.images.map((image) => (
                  <img
                    key={image.id}
                    src={image.imageSrc}
                    alt={image.imageAlt}
                    className="rounded-lg w-full"
                  />
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <form>
                <button
                  type="submit"
                  className="mt-8 flex w-full items-center justify-center font-bold
                             rounded-md border border-transparent bg-black px-8 py-3
                            text-base text-white hover:bg-gray-700
                            focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                >
                  Add favorites
                </button>
              </form>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">
                  Description
                </h2>

                <div
                  className="prose prose-sm mt-4 text-gray-500"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails
