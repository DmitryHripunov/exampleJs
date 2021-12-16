import example from '../common.blocks/example/example';

test('Проверка Email должна пропускать корректные значения', () => {
  expect(example('email@asd.com')).toBe(true);
});
test('Проверка Email не должна пропускать пробельные символы', () => {
  expect(example('email @asd.com')).toBe(false);
});
