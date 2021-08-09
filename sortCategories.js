function sortCategoriesForInsert(inputJson) {
  let categories = JSON.parse(inputJson);
  let map = {},	rootCategories = [];

  for (let cat of categories) {
    if (cat.parent_id == null) {
      	rootCategories.push(cat);
    } else {
	if(map[cat.parent_id])
		map[cat.parent_id].push(cat);
	else
		map[cat.parent_id] = [ cat ];
    }
  }
  
  categories = [];
  for (let root of rootCategories) 
	sortCategories(root, map, categories);  

  return JSON.stringify(categories);
};

function sortCategories(category, map, sortedCategories) {
	sortedCategories.push(category);
	
	var childCategories = map[category.id];	
	
	if(!childCategories) 
		return;
		
	for(var childCategory of childCategories) 
		sortCategories(childCategory, map, sortedCategories);	
}

var categories = [
  { name: "Accessories", id: 1, parent_id: 20 },
  { name: "Watches", id: 57, parent_id: 1 },
  { name: "Men", id: 20, parent_id: null },
  { name: "Jeans", id: 2, parent_id: 30 },
  { name: "Shirts", id: 30, parent_id: null },
];

var sorted = sortCategoriesForInsert(JSON.stringify(categories));
console.log(sorted);
