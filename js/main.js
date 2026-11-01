import { initTheme } from './modules/theme.js';
import { initScrollFeatures } from './modules/scroll.js';
import { initFeaturesAnimation } from './modules/animations.js';
import { initCarousel } from './modules/carousel.js';
import { initPricingAnimation } from './modules/animations-pricing.js';
import { uniModalka } from './modules/uni-modalka.js';
import { register } from './modals/register.js';
import { login } from './modals/login.js';
import { feedback } from './modals/feedback.js';

uniModalka();
initTheme();
initScrollFeatures();
initFeaturesAnimation();
initPricingAnimation();
initCarousel();
register();
login();
feedback();