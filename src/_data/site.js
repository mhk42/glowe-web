module.exports = {
  title: process.env.SITE_TITLE || '117 Site',
  description:
    process.env.SITE_DESCRIPTION ||
    'A static site with code quality gates and Lighthouse CI',
  url:
    process.env.SITE_URL ||
    'https://kaw393939.github.io/is117_ai_test_practice',
  author: process.env.SITE_AUTHOR || 'Your Name',
  environment: process.env.NODE_ENV || 'development',
};
