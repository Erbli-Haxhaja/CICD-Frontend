//./plugins/posthog.js
import posthog from "posthog-js";

export default {
  install(app) {
    app.config.globalProperties.$posthog = posthog.init(
      'phc_TuYECgvPzVSRHIc8R0LpJGl9GiF09J9n5ISjX4JhVon',
      {
        api_host: 'https://eu.i.posthog.com',
      }
    );
  },
};