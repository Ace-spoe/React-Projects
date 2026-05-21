export default function generateProducts(){
  const products = [];
  for (let i = 1; i <= 100; i++) {
    products.push({
      id: i,
      name: `Product ${i}`,
      category: ['Electronics', 'Clothing', 'Books', 'Home', 'Toys'][Math.floor(Math.random() * 5)],
      price: Math.floor(Math.random() * 1000) + 10,
      rating: Math.floor(Math.random() * 5) + 1,
      inStock: Math.random() > 0.3
    });
  }
  return products;
};