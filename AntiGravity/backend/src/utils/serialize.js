/**
 * JSON serialization helpers so the frontend can always use `id`.
 */

export function applyIdTransform(schema, { publicIdField, strip } = {}) {
  const transform = (_doc, ret) => {
    ret.id = publicIdField && ret[publicIdField] ? String(ret[publicIdField]) : String(ret._id);
    if (Array.isArray(strip)) {
      for (const key of strip) {
        delete ret[key];
      }
    }
    delete ret.__v;
    return ret;
  };

  schema.set('toJSON', { virtuals: true, transform });
  schema.set('toObject', { virtuals: true, transform });
}
