export const BREED_IMAGE_MAP: Record<string, string> = {
  // 소형견
  '말티즈':        '/maltese.png',
  '포메라니안':    '/pomeranian.png',
  '시츄':          '/shih-tzu.png',
  '비숑프리제':    '/bichon-frise.png',
  '치와와':        '/chihuahua.png',
  '요크셔테리어':  '/yorkshire-terrier.png',
  '닥스훈트':      '/dachshund.png',
  '푸들':          '/poodle.png',

  // 골든/라브라도
  '골든리트리버':      '/golden-retriever.png',
  '라브라도리트리버':  '/labrador-retriever.png',

  // 중형견
  '비글':          '/beagle.png',
  '웰시코기':      '/welsh-corgi.png',
  '진돗개':        '/jindo.png',
  '프렌치불독':    '/french-bulldog.png',

  // 대형견
  '시베리안허스키': '/siberian-husky.png',

  // 단모/단·중모 고양이
  '코리안숏헤어':   '/korean-shorthair.png',
  '러시안블루':     '/russian-blue.png',
  '브리티시숏헤어': '/british-shorthair.png',
  '아비시니안':     '/abyssinian.png',
  '봄베이':         '/bombay.png',
  '샴':             '/siamese.png',
  '벵갈':           '/bengal.png',
  '스핑크스':       '/sphynx.png',

  // 장모종 고양이
  '메인쿤':        '/maine-coon.png',
  '페르시안':      '/persian.png',
  '노르웨이숲':    '/norwegian-forest.png',
  '라가머핀':      '/ragamuffin.png',
  '스코티시폴드':  '/scottish-fold.png',
};

export function getBreedImage(
  petBreed: string | undefined,
  petType: string | undefined
): string {
  if (petBreed && BREED_IMAGE_MAP[petBreed]) return BREED_IMAGE_MAP[petBreed];
  if (petType === 'cat') return '/cat.svg';
  return '/golden-retriever.png';
}
