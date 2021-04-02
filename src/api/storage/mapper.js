import { DIR_FILE } from '../../assets/values/directories';

export default (object, type, favorites) => ({
  createTime: object.mtime.toString(),
  path: { uri: `${DIR_FILE}${object.path}` },
  name: object.name,
  favorite: isFavorite(favorites, object),
  type,
});

function isFavorite(favorites, obj) {
  return favorites.includes(obj.name);
}
