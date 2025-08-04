import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <div>
      <Navbar />
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 text-green-700">Welcome to EcoBin</h2>
          <p className="text-lg text-gray-700 mb-6 max-w-xl mx-auto">
            EcoBin helps you request garbage pickup easily, track the status, and keep your area clean.
          </p>
          <div className="space-x-4">
            <a href="/signup" className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow">
              Get Started
            </a>
            <a href="/signin" className="bg-white border border-green-600 text-green-600 font-semibold py-2 px-4 rounded hover:bg-green-100">
              Already a User?
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
