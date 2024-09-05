function NewsletterSignup() {
  return (
    <div className="mx-4">
      <h3 className="mb-5 text-xl">Sign Up To Newsletter</h3>
      <p>
        Join 60.000+ subscribers and get a new discount coupon <br /> on every
        Saturday.
      </p>
      <div className="mt-4">
        <form method="post">
          <div className="flex w-full flex-nowrap">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Your Email"
              className="w-full rounded-l-lg pl-4 text-black"
            />
            <button
              type="submit"
              value=""
              className="rounded-r-lg bg-[#FFCA1D] px-2 py-3 text-black"
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
