
// TODO: the payload is not consistent, so I'm mapping to avoid conditionals in the components
// the image as arrays is not useful, so I'm getting the first image
export const mapper = (sections) => {
  return sections.map((section) => {
    return {
      id: section.id,
      name: section.name,
      image: section.images.at(0).image,
      items: itemMapper(section.items),
    }
  });
};

const itemMapper = (items) => {
  // TODO: default image because without image the layout looks bad
  const defaultImage = 'https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg';
  return items.map((item) => {
    return {
      id: item.id,
      name: item.name,
      description: item.description || 'No description available',
      image: item.images? item.images.at(0).image : defaultImage,
      modifiers: modifierMapper(item),
      price: item.price,
    }
  });
};

const modifierMapper = (item) => {
  // TODO: if there is no modifiers, return the item itself as a modifier
  if (!item?.modifiers?.at(0).items?.length) {
    return [{
      id: item.id,
      name: item.name,
      price: item.price,
    }];
  }

  return item.modifiers.at(0).items.map((modifier) => {
    return {
      id: modifier.id,
      name: modifier.name,
      price: modifier.price,
    }
  });
};