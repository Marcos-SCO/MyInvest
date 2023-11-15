function attributesToString(attributes) {
  return Object.entries(attributes)
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ');
}

export { attributesToString };