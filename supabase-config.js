/* RentNest — Supabase configuration and client initialization.
   Provides a globally accessible Supabase client instance (window.supabaseClient)
   using credentials supplied via window.ENV or fallback environment settings. */
(function () {
  "use strict";

  // Provide configuration via window.ENV or global definitions
  var ENV = window.ENV || {};

  var SUPABASE_URL = ENV.SUPABASE_URL || window.SUPABASE_URL || "";
  var SUPABASE_ANON_KEY = ENV.SUPABASE_ANON_KEY || window.SUPABASE_ANON_KEY || "";

  var client = null;

  if (SUPABASE_URL && SUPABASE_ANON_KEY && window.supabase && typeof window.supabase.createClient === "function") {
    try {
      client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    } catch (err) {
      console.warn("[RentNest] Error initializing Supabase client:", err);
    }
  }

  window.RENTNEST_SUPABASE = {
    url: SUPABASE_URL,
    anonKey: SUPABASE_ANON_KEY,
    client: client,
    isConfigured: function () {
      return Boolean(client || (window.supabaseClient));
    },
    getClient: function () {
      return client || window.supabaseClient || null;
    }
  };

  // Convenient alias if desired
  if (client && !window.supabaseClient) {
    window.supabaseClient = client;
  }
})();
