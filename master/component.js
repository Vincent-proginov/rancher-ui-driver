"use strict";

define("nodes/components/driver-xen-orchestra/component", ["exports", "shared/mixins/node-driver"], function (exports, _nodeDriver) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const LAYOUT = "PHNlY3Rpb24gY2xhc3M9Imhvcml6b250YWwtZm9ybSI+CiAgPGRpdiBjbGFzcz0iY29udGFpbmVyLWZsdWlkIj4KCiAgICB7eyEtLSBUaGlzIGxpbmUgc2hvd3MgdGhlIGRyaXZlciB0aXRsZSB3aGljaCB5b3UgZG9uJ3QgaGF2ZSB0byBjaGFuZ2UgaXQgLS19fQogICAgPGRpdiBjbGFzcz0ib3Zlci1ociI+PHNwYW4+e3tkcml2ZXJPcHRpb25zVGl0bGV9fTwvc3Bhbj48L2Rpdj4KCgogICAge3sjYWNjb3JkaW9uLWxpc3Qgc2hvd0V4cGFuZEFsbD1mYWxzZSBhcyB8IGFsIGV4cGFuZEZuIHwgfX0KICAgIHt7I2FjY29yZGlvbi1saXN0LWl0ZW0KICAgIHRpdGxlPSIxLiBBY2NvdW50IEFjY2VzcyIKICAgIGRldGFpbD0iQ29uZmlndXJlIGNvbm5lY3Rpb24gdG8gWGVuIE9yY2hlc3RyYSIKICAgIGV4cGFuZE9uSW5pdD10cnVlCiAgICBleHBhbmQ9KGFjdGlvbiBleHBhbmRGbikKICAgIH19CgogICAgPGRpdiBjbGFzcz0icm93Ij4KICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tMTIiPgogICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5YZW4gT3JjaGVzdHJhIFVSTAogICAgICAgICAgPHNwYW4gY2xhc3M9ImZpZWxkLXJlcXVpcmVkIGVtYmVyLXZpZXciPio8L3NwYW4+CiAgICAgICAgPC9sYWJlbD4KICAgICAgICB7e2lucHV0IHR5cGU9InRleHQiCiAgICAgICAgY2xhc3M9ImZvcm0tY29udHJvbCIKICAgICAgICB2YWx1ZT1tb2RlbC54ZW4tb3JjaGVzdHJhQ29uZmlnLnhvVXJsCiAgICAgICAgcGxhY2Vob2xkZXI9Imh0dHBzOi8veG8uZXhhbXBsZS5jb20iCiAgICAgICAgfX0KICAgICAgICA8cCBjbGFzcz0iaGVscC1ibG9jayI+WGVuIE9yY2hlc3RyYSBhZGRyZXNzIChpbmNsdWRpbmcgcHJvdG9jb2wsIGUuZy4gaHR0cHM6Ly8pPC9wPgogICAgICA8L2Rpdj4KCiAgICA8L2Rpdj4KCiAgICA8ZGl2IGNsYXNzPSJyb3ciPgogICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02Ij4KICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+VXNlcm5hbWUKICAgICAgICAgIDxzcGFuIGNsYXNzPSJmaWVsZC1yZXF1aXJlZCBlbWJlci12aWV3Ij4qPC9zcGFuPgogICAgICAgIDwvbGFiZWw+CiAgICAgICAge3tpbnB1dAogICAgICAgIHR5cGU9InRleHQiCiAgICAgICAgY2xhc3M9ImZvcm0tY29udHJvbCIKICAgICAgICB2YWx1ZT1tb2RlbC54ZW4tb3JjaGVzdHJhQ29uZmlnLnhvVXNlcm5hbWUKICAgICAgICB9fQogICAgICA8L2Rpdj4KICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CiAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPlBhc3N3b3JkCiAgICAgICAgICA8c3BhbiBjbGFzcz0iZmllbGQtcmVxdWlyZWQgZW1iZXItdmlldyI+Kjwvc3Bhbj4KICAgICAgICA8L2xhYmVsPgogICAgICAgIHt7aW5wdXQKICAgICAgICB0eXBlPSJwYXNzd29yZCIKICAgICAgICBjbGFzcz0iZm9ybS1jb250cm9sIgogICAgICAgIHZhbHVlPW1vZGVsLnhlbi1vcmNoZXN0cmFDb25maWcueG9QYXNzd29yZAogICAgICAgIH19CiAgICAgIDwvZGl2PgogICAgPC9kaXY+CgogICAgPGRpdiBjbGFzcz0iY29sLW1kLTIiPgogICAgICA8ZGl2IGNsYXNzPSJjaGVja2JveCI+CiAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPnt7aW5wdXQgdHlwZT0iY2hlY2tib3giIGNoZWNrZWQ9bW9kZWwueGVuLW9yY2hlc3RyYUNvbmZpZy54b0luc2VjdXJlfX0KICAgICAgICAgIEFsbG93IGluc2VjdXJlIGNvbW11bmljYXRpb24gKFNraXAgVExTIHZlcmlmaWNhdGlvbikKICAgICAgICA8L2xhYmVsPgogICAgICA8L2Rpdj4KICAgIDwvZGl2PgoKICAgIHt7L2FjY29yZGlvbi1saXN0LWl0ZW19fQoKICAgIHt7I2FjY29yZGlvbi1saXN0LWl0ZW0KICAgIHRpdGxlPSIyLiBJbnN0YW5jZSIKICAgIGRldGFpbD0iQ2hvb3NlIHRoZSBzaXplIGFuZCBPUyBvZiB0aGUgdmlydHVhbCBtYWNoaW5lIgogICAgZXhwYW5kT25Jbml0PXRydWUKICAgIGV4cGFuZD0oYWN0aW9uIGV4cGFuZEZuKQogICAgfX0KCiAgICA8ZGl2IGNsYXNzPSJyb3ciPgogICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02Ij4KICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+Q1BVczwvbGFiZWw+CiAgICAgICAgPGRpdiBjbGFzcz0iaW5wdXQtZ3JvdXAiPgogICAgICAgICAge3tpbnB1dC1pbnRlZ2VyCiAgICAgICAgICBtaW49MQogICAgICAgICAgbWF4PTMyCiAgICAgICAgICB2YWx1ZT1tb2RlbC54ZW4tb3JjaGVzdHJhQ29uZmlnLnhvVm1DcHVzCiAgICAgICAgICBjbGFzc05hbWVzPSJmb3JtLWNvbnRyb2wiCiAgICAgICAgICB9fQogICAgICAgICAgPGRpdiBjbGFzcz0iaW5wdXQtZ3JvdXAtYWRkb24gYmctZGVmYXVsdCI+CiAgICAgICAgICAgIHt7dCAibm9kZURyaXZlci5oYXJ2ZXN0ZXIuY3B1Q291bnQudW5pdCIgY29yZXM9Y29uZmlnLnhvVm1DcHVzfX0KICAgICAgICAgIDwvZGl2PgogICAgICAgIDwvZGl2PgogICAgICA8L2Rpdj4KICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CiAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPk1lbW9yeTwvbGFiZWw+CiAgICAgICAgPGRpdiBjbGFzcz0iaW5wdXQtZ3JvdXAiPgogICAgICAgICAge3tpbnB1dC1pbnRlZ2VyCiAgICAgICAgICBtaW49MQogICAgICAgICAgdmFsdWU9bW9kZWwueGVuLW9yY2hlc3RyYUNvbmZpZy54b1ZtTWVtCiAgICAgICAgICBjbGFzc05hbWVzPSJmb3JtLWNvbnRyb2wiCiAgICAgICAgICB9fQogICAgICAgICAgPGRpdiBjbGFzcz0iaW5wdXQtZ3JvdXAtYWRkb24gYmctZGVmYXVsdCI+TUI8L2Rpdj4KICAgICAgICA8L2Rpdj4KICAgICAgPC9kaXY+CiAgICA8L2Rpdj4KCiAgICA8ZGl2IGNsYXNzPSJyb3ciPgogICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02Ij4KICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+CiAgICAgICAgICBUZW1wbGF0ZSBOYW1le3tmaWVsZC1yZXF1aXJlZH19CiAgICAgICAgPC9sYWJlbD4KICAgICAgICB7e2lucHV0IHR5cGU9InRleHQiCiAgICAgICAgY2xhc3M9ImZvcm0tY29udHJvbCIKICAgICAgICB2YWx1ZT1tb2RlbC54ZW4tb3JjaGVzdHJhQ29uZmlnLnhvVGVtcGxhdGUKICAgICAgICB9fQogICAgICAgIDxwIGNsYXNzPSJoZWxwLWJsb2NrIj5UaGUgbmFtZSBvZiB0aGUgdGVtcGxhdGUgdG8gY2xvbmU8L3A+CiAgICAgIDwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02Ij4KICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+TmV0d29yazwvbGFiZWw+CiAgICAgICAge3tpbnB1dCB0eXBlPSJ0ZXh0IgogICAgICAgIGNsYXNzPSJmb3JtLWNvbnRyb2wiCiAgICAgICAgdmFsdWU9bW9kZWwueGVuLW9yY2hlc3RyYUNvbmZpZy54b1ZtTmV0d29yawogICAgICAgIH19CiAgICAgICAgPHAgY2xhc3M9ImhlbHAtYmxvY2siPk5ldHdvcmsgbmFtZSBvciBVVUlEIHRvIGF0dGFjaCB0bzwvcD4KICAgICAgPC9kaXY+CiAgICA8L2Rpdj4KCiAgICA8ZGl2IGNsYXNzPSJyb3ciPgogICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+Q2xvdWQgQ29uZmlnIFlBTUw8L2xhYmVsPgogICAgICB7e2lucHV0LXlhbWwKICAgICAgc2hvd0Rvd25sb2FkPWZhbHNlCiAgICAgIHNob3dVcGxvYWQ9ZmFsc2UKICAgICAgY2FuQ2hhbmdlTmFtZT1mYWxzZQogICAgICBndXR0ZXJzPShhcnJheSkKICAgICAgbWluSGVpZ2h0PTUwMAogICAgICB2YWx1ZT1tb2RlbC54ZW4tb3JjaGVzdHJhQ29uZmlnLnhvQ2xvdWRDb25maWcKICAgICAgfX0KICAgIDwvZGl2PgoKICAgIHt7L2FjY29yZGlvbi1saXN0LWl0ZW19fQogICAge3svYWNjb3JkaW9uLWxpc3R9fQoKICAgIHt7IS0tIFRoaXMgZm9sbG93aW5nIGNvbnRhaW5zIHRoZSBOYW1lLCBMYWJlbHMgYW5kIEVuZ2luZSBPcHRpb25zIGZpZWxkcyAtLX19CiAgICA8ZGl2IGNsYXNzPSJvdmVyLWhyIj4KICAgICAgPHNwYW4+CiAgICAgICAge3t0ZW1wbGF0ZU9wdGlvbnNUaXRsZX19CiAgICAgIDwvc3Bhbj4KICAgIDwvZGl2PgoKICAgIHt7Zm9ybS1uYW1lLWRlc2NyaXB0aW9uCiAgICBtb2RlbD1tb2RlbAogICAgbmFtZVJlcXVpcmVkPXRydWUKICAgIHJvd0NsYXNzPSJyb3cgbWItMTAiCiAgICB9fQoKICAgIHt7Zm9ybS11c2VyLWxhYmVscwogICAgaW5pdGlhbExhYmVscz1sYWJlbFJlc291cmNlLmxhYmVscwogICAgc2V0TGFiZWxzPShhY3Rpb24gJ3NldExhYmVscycpCiAgICBleHBhbmQ9KGFjdGlvbiBleHBhbmRGbikKICAgIH19CgogICAge3tmb3JtLW5vZGUtdGFpbnRzCiAgICBtb2RlbD1tb2RlbAogICAgZXhwYW5kPShhY3Rpb24gZXhwYW5kRm4pCiAgICB9fQoKICAgIHt7Zm9ybS1lbmdpbmUtb3B0cwogICAgbWFjaGluZT1tb2RlbAogICAgc2hvd0VuZ2luZVVybD1zaG93RW5naW5lVXJsCiAgICB9fQoKICAgIHt7IS0tIFRoaXMgY29tcG9uZW50IHNob3dzIGVycm9ycyBwcm9kdWNlZCBieSB2YWxpZGF0ZSgpIGluIHRoZSBjb21wb25lbnQgLS19fQogICAge3t0b3AtZXJyb3JzIGVycm9ycz1lcnJvcnN9fQoKICAgIHt7IS0tIFRoaXMgY29tcG9uZW50IHNob3dzIHRoZSBDcmVhdGUgYW5kIENhbmNlbCBidXR0b25zIC0tfX0KICAgIHt7c2F2ZS1jYW5jZWwgc2F2ZT0ic2F2ZSIgY2FuY2VsPShhY3Rpb24gImNhbmNlbCIpfX0KICA8L2Rpdj4KPC9zZWN0aW9uPgo=";
  const computed = Ember.computed;
  const get = Ember.get;
  const set = Ember.set;
  const alias = Ember.computed.alias;
  const service = Ember.inject.service;
  const defaultRadix = 10;
  const defaultBase = 1024;
  exports.default = Ember.Component.extend(_nodeDriver.default, {
    driverName: 'xen-orchestra',
    config: alias('model.xen-orchestraConfig'),
    app: service(),

    init() {
      const decodedLayout = window.atob(LAYOUT);
      const template = Ember.HTMLBars.compile(decodedLayout, {
        moduleName: 'nodes/components/driver-xen-orchestra/template'
      });
      set(this, 'layout', template);

      this._super(...arguments);
    },

    bootstrap: function () {
      let config = get(this, 'globalStore').createRecord({
        type: 'xen-orchestraConfig',
        xoUrl: "",
        xoUsername: "",
        xoPassword: "",
        xoInsecure: false,
        xoTemplate: "",
        xoVmCpus: 2,
        xoVmMem: 2048,
        xoCloudConfig: "#cloud-config\n\n",
        xoVmNetwork: ""
      });
      set(this, 'model.xen-orchestraConfig', config);
    },

    validate() {
      this._super();

      var errors = get(this, 'errors') || [];

      if (!get(this, 'model.name')) {
        errors.push('Name is required');
      }

      if (!get(this, 'config.xoUrl')) {
        errors.push('Xen Orchestra URL is required');
      }

      if (!get(this, 'config.xoUsername')) {
        errors.push('Username is required');
      }

      if (!get(this, 'config.xoPassword')) {
        errors.push('Password is required');
      }

      if (parseInt(get(this, 'config.xoVmMem'), defaultRadix) < defaultBase) {
        errors.push('Memory Size must be at least 1024 MB');
      }

      if (!get(this, 'config.xoTemplate')) {
        errors.push('Template Name is required');
      }

      if (get(errors, 'length')) {
        set(this, 'errors', errors);
        return false;
      } else {
        set(this, 'errors', null);
        return true;
      }
    }

  });
});;
"use strict";

define("ui/components/driver-xen-orchestra/component", ["exports", "nodes/components/driver-xen-orchestra/component"], function (exports, _component) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _component.default;
    }
  });
});