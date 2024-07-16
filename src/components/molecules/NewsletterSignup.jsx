function NewsletterSignup() {
  return (
    <div className="mx-4">
      <h3 className="text-xl mb-5">Sign Up To Newsletter</h3>
      <p>
        Join 60.000+ subscribers and get a new discount coupon <br /> on every
        Saturday.
      </p>
      <div className="mt-4">
        <form method="post">
          <div className="flex flex-nowrap w-full">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Your Email"
              className="w-full pl-4 rounded-l-lg text-black"
            />
            <button
              type="submit"
              value=""
              className="px-2 py-3 bg-[#FFCA1D] rounded-r-lg text-black"
            >
              SUBSCRIBE{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewsletterSignup;
