const RECIPES = [
  {
    id: '1', emoji: '🍝', name: 'Spaghetti Carbonara', time: '30 min', difficulty: 'Easy', cuisine: 'Italian', servings: 2,
    description: 'A rich and creamy Roman classic made with eggs, cured pork, and aged cheese — no cream needed.',
    ingredients: ['200g spaghetti', '100g pancetta or guanciale', '2 large eggs + 1 yolk', '50g Pecorino Romano, grated', '50g Parmesan, grated', 'Freshly ground black pepper', 'Salt for pasta water'],
    steps: ['Bring a large pot of salted water to a boil and cook spaghetti until al dente.', 'Fry pancetta in a pan over medium heat until crispy, then remove from heat.', 'Whisk together eggs, yolk, and both cheeses in a bowl with a generous amount of black pepper.', 'Reserve a cup of pasta water, then drain the pasta and add it to the pan with pancetta off the heat.', 'Pour the egg mixture over the pasta, tossing quickly and adding pasta water little by little until creamy.', 'Serve immediately with extra cheese and black pepper.'],
  },
  {
    id: '2', emoji: '🍜', name: 'Ramen Noodle Soup', time: '45 min', difficulty: 'Medium', cuisine: 'Japanese', servings: 2,
    description: 'A deeply savoury Japanese noodle soup with a rich broth, soft-boiled egg, and tender pork.',
    ingredients: ['2 portions ramen noodles', '1 litre chicken or pork broth', '2 tbsp soy sauce', '1 tbsp miso paste', '200g chashu pork belly (or cooked chicken)', '2 soft-boiled eggs', '2 spring onions, sliced', '1 sheet nori', '1 tsp sesame oil', 'Bean sprouts (optional)'],
    steps: ['Bring broth to a simmer and stir in soy sauce, miso paste, and sesame oil.', 'Cook ramen noodles according to packet instructions, then drain.', 'Slice pork belly and warm through in the broth.', 'Divide noodles between two bowls and ladle hot broth over them.', 'Top with pork, halved soft-boiled egg, spring onions, nori, and bean sprouts.', 'Serve immediately while hot.'],
  },
  {
    id: '3', emoji: '🥗', name: 'Caesar Salad', time: '15 min', difficulty: 'Easy', cuisine: 'American', servings: 2,
    description: 'A timeless salad with crisp romaine, crunchy croutons, and a tangy anchovy-spiked dressing.',
    ingredients: ['1 large romaine lettuce, chopped', '50g Parmesan, shaved', '1 cup croutons', '3 tbsp mayonnaise', '1 tbsp lemon juice', '1 tsp Worcestershire sauce', '1 tsp Dijon mustard', '1 garlic clove, minced', '2 anchovy fillets (optional)', 'Black pepper'],
    steps: ['Whisk together mayo, lemon juice, Worcestershire, mustard, garlic, and anchovies to make the dressing.', 'Wash and dry romaine leaves, then tear or chop into bite-sized pieces.', 'Toss lettuce with the dressing until well coated.', 'Add croutons and most of the Parmesan and toss again.', 'Top with remaining Parmesan and a crack of black pepper. Serve immediately.'],
  },
  {
    id: '4', emoji: '🌮', name: 'Beef Tacos', time: '25 min', difficulty: 'Easy', cuisine: 'Mexican', servings: 4,
    description: 'Juicy seasoned beef in warm tortillas with fresh toppings — a crowd-pleasing weeknight favourite.',
    ingredients: ['500g beef mince', '8 small flour or corn tortillas', '1 tbsp olive oil', '1 tsp cumin', '1 tsp smoked paprika', '½ tsp garlic powder', '½ tsp chilli flakes', 'Salt and pepper', 'Toppings: shredded lettuce, diced tomato, grated cheese, sour cream, lime wedges, fresh coriander'],
    steps: ['Heat oil in a pan over medium-high heat. Add beef mince and cook, breaking it up, until browned.', 'Drain excess fat, then add cumin, paprika, garlic powder, chilli flakes, salt and pepper. Stir well.', 'Add a splash of water and cook for 2 more minutes until fragrant.', 'Warm tortillas in a dry pan or microwave.', 'Fill tortillas with beef and your choice of toppings. Serve with lime wedges.'],
  },
  {
    id: '5', emoji: '🍛', name: 'Chicken Tikka Masala', time: '50 min', difficulty: 'Medium', cuisine: 'Indian', servings: 4,
    description: 'Tender marinated chicken in a rich, spiced tomato and cream sauce — one of the world\'s most loved curries.',
    ingredients: ['600g chicken breast, cubed', '200ml plain yoghurt', '2 tsp garam masala', '1 tsp turmeric', '1 tsp cumin', '1 tbsp vegetable oil', '1 onion, finely chopped', '3 garlic cloves, minced', '1 tbsp grated ginger', '400g tin chopped tomatoes', '150ml double cream', 'Fresh coriander to serve', 'Salt'],
    steps: ['Mix yoghurt with half the spices and salt. Add chicken, coat well, and marinate for at least 30 minutes.', 'Grill or pan-fry the marinated chicken until charred and cooked through. Set aside.', 'Heat oil in a pan, fry onion until golden, then add garlic and ginger and cook 2 minutes.', 'Add remaining spices, stir for 1 minute, then pour in tomatoes. Simmer for 10 minutes.', 'Stir in cream and add the cooked chicken. Simmer for 5 minutes.', 'Garnish with fresh coriander and serve with rice or naan.'],
  },
  {
    id: '6', emoji: '🍕', name: 'Margherita Pizza', time: '40 min', difficulty: 'Medium', cuisine: 'Italian', servings: 2,
    description: 'A classic Neapolitan pizza with a crispy base, sweet tomato sauce, fresh mozzarella, and basil.',
    ingredients: ['300g pizza dough (store-bought or homemade)', '150ml passata', '1 tsp dried oregano', '1 garlic clove, minced', '150g fresh mozzarella, torn', 'Handful fresh basil leaves', '2 tbsp olive oil', 'Salt and pepper'],
    steps: ['Preheat oven to its highest setting (250°C+) with a baking tray inside.', 'Mix passata with garlic, oregano, salt, and 1 tbsp olive oil to make the sauce.', 'Stretch or roll the dough on a floured surface to a thin round.', 'Spread sauce over the base, leaving a border for the crust.', 'Scatter mozzarella over the top and drizzle with remaining oil.', 'Slide onto the hot baking tray and bake for 8–12 minutes until crust is golden and cheese is bubbling.', 'Top with fresh basil and serve immediately.'],
  },
  {
    id: '7', emoji: '🥘', name: 'Pad Thai', time: '30 min', difficulty: 'Medium', cuisine: 'Thai', servings: 2,
    description: 'Thailand\'s favourite stir-fried noodle dish — sweet, savoury, and tangy with a satisfying crunch.',
    ingredients: ['200g flat rice noodles', '200g prawns or chicken, sliced', '2 eggs', '3 tbsp fish sauce', '2 tbsp tamarind paste', '1 tbsp sugar', '2 tbsp vegetable oil', '3 spring onions, chopped', '2 garlic cloves, minced', '100g bean sprouts', 'Crushed peanuts, lime wedges, chilli flakes to serve'],
    steps: ['Soak rice noodles in warm water for 20 minutes, then drain.', 'Mix fish sauce, tamarind paste, and sugar together in a small bowl.', 'Heat oil in a wok over high heat. Add garlic, then protein and stir-fry until cooked.', 'Push to the side, crack in eggs and scramble until just set, then mix together.', 'Add noodles and sauce. Toss everything together over high heat for 2 minutes.', 'Add bean sprouts and spring onions, toss briefly.', 'Serve with crushed peanuts, lime wedges, and chilli flakes on the side.'],
  },
  {
    id: '8', emoji: '🥩', name: 'Classic Beef Burger', time: '20 min', difficulty: 'Easy', cuisine: 'American', servings: 2,
    description: 'A juicy homemade beef patty with all the classic toppings in a toasted brioche bun.',
    ingredients: ['400g beef mince (20% fat)', '2 brioche burger buns', '2 slices cheddar cheese', 'Lettuce leaves', '2 tomato slices', '2 tbsp burger sauce or mayo', 'Ketchup and mustard', 'Salt and pepper'],
    steps: ['Divide mince into two balls, season generously with salt and pepper, then press into patties slightly wider than the buns.', 'Heat a griddle or pan over very high heat. Cook patties for 3–4 minutes each side for medium.', 'Add cheese in the last minute of cooking and cover to melt.', 'Toast the buns cut-side down in the same pan.', 'Spread sauce on the base bun, add lettuce and tomato, then the patty, then ketchup and mustard.', 'Top and serve immediately.'],
  },
  {
    id: '9', emoji: '🍣', name: 'Salmon Sushi Rolls', time: '60 min', difficulty: 'Hard', cuisine: 'Japanese', servings: 4,
    description: 'Homemade maki rolls filled with fresh salmon, cucumber, and avocado — impressive and satisfying to make.',
    ingredients: ['300g sushi rice', '360ml water', '3 tbsp rice vinegar', '1 tbsp sugar', '1 tsp salt', '4 nori sheets', '200g sashimi-grade salmon, sliced', '1 avocado, sliced', '½ cucumber, cut into strips', 'Soy sauce, wasabi, pickled ginger to serve'],
    steps: ['Cook sushi rice with water, then mix with rice vinegar, sugar, and salt while still warm. Fan to cool.', 'Place a nori sheet shiny-side down on a bamboo mat. Spread a thin, even layer of rice, leaving a 2cm gap at the far edge.', 'Lay salmon, avocado, and cucumber in a line across the near edge of the rice.', 'Using the mat, roll tightly away from you, pressing firmly. Seal the edge with a little water.', 'Using a sharp wet knife, slice the roll into 6–8 pieces with a single clean motion.', 'Serve with soy sauce, wasabi, and pickled ginger.'],
  },
  {
    id: '10', emoji: '🥐', name: 'Croissants', time: '3 hrs', difficulty: 'Hard', cuisine: 'French', servings: 8,
    description: 'Flaky, buttery, golden croissants made from scratch — a true labour of love with an incredible reward.',
    ingredients: ['500g strong white flour', '10g salt', '80g sugar', '10g instant yeast', '300ml warm milk', '30g softened butter (for dough)', '280g cold unsalted butter (for lamination)', '1 egg, beaten (for egg wash)'],
    steps: ['Mix flour, salt, sugar, yeast, milk, and softened butter into a dough. Knead 5 minutes, then chill overnight.', 'Beat cold butter into a flat square between baking paper. Keep cold but pliable.', 'Roll dough into a large rectangle, place butter block in the centre, and fold dough over to encase it.', 'Roll out and fold into thirds (like a letter). Chill 30 minutes. Repeat this process 3 more times.', 'Roll dough to 5mm thick and cut into long triangles. Roll each triangle from base to tip.', 'Place on a lined tray, brush with egg wash, and prove for 2 hours until puffy.', 'Brush again with egg wash and bake at 200°C for 15–18 minutes until deep golden brown.'],
  },
  {
    id: '11', emoji: '🌯', name: 'Chicken Burrito Bowl', time: '35 min', difficulty: 'Easy', cuisine: 'Mexican', servings: 2,
    description: 'A vibrant, filling bowl with spiced chicken, rice, black beans, and all your favourite toppings.',
    ingredients: ['2 chicken breasts', '1 tsp cumin', '1 tsp smoked paprika', '½ tsp garlic powder', '200g cooked rice', '400g tin black beans, drained', '1 avocado, diced', '100g corn (tinned or fresh)', 'Salsa', 'Sour cream', 'Lime juice', 'Fresh coriander', 'Salt and olive oil'],
    steps: ['Toss chicken in cumin, paprika, garlic powder, salt, and a drizzle of oil.', 'Cook chicken in a pan over medium-high heat for 5–6 minutes each side until cooked through. Rest then slice.', 'Warm black beans in a small pan with a pinch of salt.', 'Build the bowls: start with rice, then add beans, corn, avocado, and sliced chicken.', 'Top with salsa, sour cream, and fresh coriander. Squeeze lime over everything before eating.'],
  },
  {
    id: '12', emoji: '🍲', name: 'Lentil Dal', time: '40 min', difficulty: 'Easy', cuisine: 'Indian', servings: 4,
    description: 'A comforting, fragrant Indian lentil stew that is hearty, nutritious, and packed with spice.',
    ingredients: ['300g red lentils, rinsed', '1 litre vegetable stock', '1 onion, finely chopped', '3 garlic cloves, minced', '1 tbsp grated ginger', '400g tin chopped tomatoes', '1 tsp turmeric', '1 tsp cumin', '1 tsp coriander', '½ tsp chilli powder', '2 tbsp vegetable oil', 'Salt', 'Fresh coriander and naan to serve'],
    steps: ['Heat oil in a large pot. Fry onion until soft, then add garlic and ginger and cook 2 minutes.', 'Add all spices and stir for 1 minute until fragrant.', 'Pour in tomatoes and cook for 5 minutes, stirring occasionally.', 'Add lentils and stock. Bring to a boil, then simmer uncovered for 25 minutes until lentils are very soft.', 'Season with salt and adjust spices to taste. Add water if too thick.', 'Serve topped with fresh coriander alongside naan or rice.'],
  },
  {
    id: '13', emoji: '🍝', name: 'Pesto Pasta', time: '20 min', difficulty: 'Easy', cuisine: 'Italian', servings: 2,
    description: 'A quick and vibrant pasta with homemade basil pesto — simple ingredients, incredible flavour.',
    ingredients: ['200g pasta (linguine or spaghetti)', 'Large bunch fresh basil', '50g pine nuts, lightly toasted', '50g Parmesan, grated', '1 garlic clove', '80ml extra virgin olive oil', 'Juice of ½ lemon', 'Salt and pepper'],
    steps: ['Cook pasta in well-salted boiling water until al dente. Reserve a cup of pasta water before draining.', 'Blend basil, pine nuts, Parmesan, garlic, lemon juice, and olive oil in a food processor until smooth. Season well.', 'Toss drained pasta with pesto, adding pasta water a splash at a time to loosen to a silky consistency.', 'Serve with extra Parmesan and a drizzle of olive oil.'],
  },
  {
    id: '14', emoji: '🦞', name: 'Lobster Bisque', time: '1 hr', difficulty: 'Hard', cuisine: 'French', servings: 4,
    description: 'An elegant, velvety French soup with rich lobster flavour — perfect for a special occasion.',
    ingredients: ['2 cooked lobster tails', '1 onion, chopped', '2 celery stalks, chopped', '1 carrot, chopped', '3 garlic cloves', '2 tbsp tomato purée', '100ml brandy or dry sherry', '500ml fish stock', '400ml double cream', '2 tbsp butter', '1 tsp paprika', 'Salt, pepper, fresh tarragon'],
    steps: ['Melt butter in a large pot. Sauté onion, celery, and carrot until soft. Add garlic and cook 1 minute.', 'Stir in tomato purée and paprika, cook 2 minutes. Add brandy and let it bubble for 1 minute.', 'Pour in fish stock and bring to a simmer for 20 minutes.', 'Blend the soup until completely smooth, then strain through a fine sieve back into the pot.', 'Stir in cream and season. Simmer gently for 10 minutes.', 'Slice lobster tail meat, warm briefly in the bisque, and serve with fresh tarragon and crusty bread.'],
  },
  {
    id: '15', emoji: '🍜', name: 'Green Curry', time: '35 min', difficulty: 'Medium', cuisine: 'Thai', servings: 4,
    description: 'A fragrant, creamy Thai green curry with a fresh herbal heat balanced by coconut milk.',
    ingredients: ['500g chicken breast or tofu, cubed', '2 tbsp green curry paste', '400ml coconut milk', '200ml chicken or vegetable stock', '1 tbsp vegetable oil', '1 tbsp fish sauce', '1 tsp sugar', '100g green beans, trimmed', '1 courgette, sliced', 'Handful Thai basil leaves', 'Lime juice, jasmine rice to serve'],
    steps: ['Heat oil in a wok or deep pan over medium heat. Add curry paste and fry for 1–2 minutes until fragrant.', 'Add coconut milk and stock and bring to a gentle simmer.', 'Add chicken (or tofu) and cook for 10 minutes until cooked through.', 'Season with fish sauce and sugar. Add green beans and courgette, cook 5 more minutes.', 'Finish with Thai basil leaves and a squeeze of lime. Serve with jasmine rice.'],
  },
  {
    id: '16', emoji: '🧆', name: 'Falafel Wrap', time: '30 min', difficulty: 'Medium', cuisine: 'American', servings: 2,
    description: 'Crispy herby falafel in a warm flatbread with hummus, pickles, and a zesty tahini drizzle.',
    ingredients: ['400g tin chickpeas, drained', '1 small onion, roughly chopped', '2 garlic cloves', 'Large handful parsley and coriander', '1 tsp cumin', '1 tsp coriander powder', '3 tbsp flour', 'Salt and pepper', 'Oil for frying', '2 flatbreads or wraps', '3 tbsp hummus', 'Sliced cucumber and tomato', 'Pickled red onion', '2 tbsp tahini mixed with lemon juice and water'],
    steps: ['Blend chickpeas, onion, garlic, herbs, and spices in a food processor until a rough paste forms. Do not over-blend.', 'Stir in flour and season well. Chill the mixture for 20 minutes.', 'Shape into small balls or patties and shallow-fry in hot oil for 3–4 minutes each side until deep golden.', 'Warm flatbreads and spread with hummus.', 'Fill with falafel, cucumber, tomato, and pickled onion. Drizzle with tahini sauce and wrap tightly.'],
  },
];

function getUserRecipes() {
  return JSON.parse(localStorage.getItem('userRecipes') || '[]');
}

function getAllRecipes() {
  return [...getUserRecipes(), ...RECIPES];
}

function getSaved() {
  return JSON.parse(localStorage.getItem('savedRecipes') || '[]');
}
