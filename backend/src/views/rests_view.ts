import Rest from '../models/Rest';
import imagesView from './images_view';

export default {
  render(rest: Rest) {
    return {
      id: rest.id,
      name: rest.name,
      latitude: rest.latitude,
      longitude: rest.longitude,
      about: rest.about,
      instructions: rest.instructions,
      opening_hours: rest.opening_hours,
      open_on_weekends: rest.open_on_weekends,
      images: imagesView.renderMany(rest.images),
    };
  },

  renderMany(rests: Rest[]) {
    return rests.map(rest => this.render(rest));
  }
};