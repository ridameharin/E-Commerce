import { Link } from "react-router-dom"

function About(){

    return(
        <div className="min-h-screen bg-[#FEFCFA] px-4 sm:px-6 py-10 sm:py-16">

            <div className="max-w-5xl mx-auto text-center">

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#5A4030]">CROCHETTELLA</h1>
                <p className="mt-4 text-[#8A6F5C] text-sm sm:text-base">
                Handmade with love, created especially for you.</p>

                <div className="mt-10 sm:mt-14 bg-[#FBF8F3] border border-[#DCCBBC] rounded-2xl p-6 sm:p-10">

                    <h2 className="text-2xl sm:text-3xl font-serif text-[#6B4632]">Our Story</h2>

                    <p className="mt-5 text-[#5A4030] text-sm sm:text-base leading-7">
                        CROCHETTELLA is a handmade crochet store created for
                        people who appreciate creativity, comfort and the beauty
                        of handmade products. Every piece is carefully crafted
                        with patience and attention to detail.</p>

                    <p className="mt-4 text-[#5A4030] text-sm sm:text-base leading-7">
                        From beautiful bags and clothing to accessories, gifts
                        and toys, our collection brings together unique crochet
                        pieces that add a special handmade touch to everyday life.</p>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-6 sm:mt-8">

                    <div className="bg-[#FBF8F3] border border-[#DCCBBC] rounded-2xl p-6">
                        <h3 className="text-xl font-serif text-[#6B4632]">Handmade</h3>
                        <p className="mt-3 text-sm text-[#8A6F5C] leading-6">
                            Each product is made with care and attention to detail.</p>
                    </div>

                    <div className="bg-[#FBF8F3] border border-[#DCCBBC] rounded-2xl p-6">
                        <h3 className="text-xl font-serif text-[#6B4632]">Unique</h3>
                        <p className="mt-3 text-sm text-[#8A6F5C] leading-6">
                            Discover crochet pieces that bring individuality to your style.</p>
                    </div>

                    <div className="bg-[#FBF8F3] border border-[#DCCBBC] rounded-2xl p-6">
                        <h3 className="text-xl font-serif text-[#6B4632]">
                            Made With Love</h3>
                        <p className="mt-3 text-sm text-[#8A6F5C] leading-6">
                            We believe handmade products carry a little extra warmth.</p>
                    </div>

                </div>
                <div className="mt-10">
                <Link
                  to="/shop"
                className="inline-block bg-[#6B4632] text-white px-8 py-3 rounded-full hover:bg-[#5A4030] transition">
                 Explore Our Collection →
                </Link>
                </div>

            </div>

        </div>
    )
}

export default About