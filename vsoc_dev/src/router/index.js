import { createRouter, createWebHistory } from "vue-router";

const modules = import.meta.glob("@/components/**/*.vue");
// Helper function to dynamically import components
const loadComponent = (path) => modules[`/src/components/${path}.vue`];

const routes = [
  {
    path: "/",
    name: "root",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
  },
  {
    path: "/innoca",
    name: "innoca",
    component: () => import("@/views/InnocaView.vue"),
  },
  {
    path: "/main",
    name: "main",
    component: () => import("@/views/MainView.vue"),
    children: [
      // OTA Update Routes
      {
        path: "before_eolupdate",
        name: "before_eolupdate",
        component: loadComponent("ota/BeforeEolUpdate"),
      },
      {
        path: "after_eolupdate",
        name: "after_eolupdate",
        component: loadComponent("ota/AfterEolUpdate"),
      },
      {
        path: "before_swupdate",
        name: "before_swupdate",
        component: loadComponent("ota/BeforeSwUpdate"),
      },
      {
        path: "after_swupdate",
        name: "after_swupdate",
        component: loadComponent("ota/AfterSwUpdate"),
      },
      {
        path: "after_popup",
        name: "after_popup",
        component: loadComponent("ota/AfterPopUp"),
      },

      // OTA History Management Routes
      {
        path: "before_eolupdatehistory",
        name: "before_eolupdatehistory",
        component: loadComponent("otahistorymanagement/BeforeEolUpdateHistory"),
      },
      {
        path: "before_swupdatehistory",
        name: "before_swupdatehistory",
        component: loadComponent("otahistorymanagement/BeforeSwUpdateHistory"),
      },
      {
        path: "after_eolupdate_h",
        name: "after_eolupdate_h",
        component: loadComponent("otahistorymanagement/AfterEolUpdateHistory"),
      },
      {
        path: "after_swupdate_h",
        name: "after_swupdate_h",
        component: loadComponent("otahistorymanagement/AfterSwUpdateHistory"),
      },
      {
        path: "offline_update_h",
        name: "offline_update_h",
        component: loadComponent("otahistorymanagement/OfflineUpdateHistory"),
      },
      {
        path: "file_download_h",
        name: "file_download_h",
        component: loadComponent("otahistorymanagement/FileDownloadHistory"),
      },

      // Campaign Management Routes
      {
        path: "campaign_management",
        name: "campaign_management",
        component: loadComponent("otahistorymanagement/CampaignManagement"),
      },
      {
        path: "campaign_register",
        name: "campaign_register",
        component: loadComponent("otahistorymanagement/CampaignRegister"),
      },
      {
        path: "campaign_detail",
        name: "campaign_detail",
        component: loadComponent("otahistorymanagement/CampaignDetail"),
      },

      // Vehicle Management Routes
      {
        path: "vehicle_management",
        name: "vehicle_management",
        component: loadComponent("vehicle/VehicleManagement"),
      },
      {
        path: "vehicle_update_h",
        name: "vehicle_update_h",
        component: loadComponent("vehicle/VehicleUpdateHistory"),
      },

      // Tbox Management Routes
      {
        path: "tbox_change",
        name: "tbox_change",
        component: loadComponent("changemachine/TboxChange"),
      },
      {
        path: "tbox_history_management",
        name: "tbox_history_management",
        component: loadComponent("changemachine/TboxHistoryManagement"),
      },

      // ECU Management Route
      {
        path: "register_sw",
        name: "register_sw",
        component: loadComponent("ecumanagement/RegisterSw"),
      },
      {
        path: "ecu_management",
        name: "ecu_management",
        component: loadComponent("ecumanagement/EcuManagement"),
      },

      // OTA Request Route
      {
        path: "ota_request",
        name: "ota_request",
        component: loadComponent("fota/OtaRequest"),
      },
      {
        path: "ota_detail",
        name: "ota_detail",
        component: loadComponent("fota/OtaDetail"),
      },
      {
        path: "tboxchange_request",
        name: "tboxchange_request",
        component: loadComponent("fota/TboxChangeRequest"),
      },
      {
        path: "tboxchange_detail",
        name: "tboxchange_detail",
        component: loadComponent("fota/TboxChangeDetail"),
      },

      // Test and User Management Routes
      {
        path: "test_page",
        name: "test_page",
        component: loadComponent("test/TestPage"),
      },
      {
        path: "user_management",
        name: "user_management",
        component: loadComponent("admin/UserManagement"),
      },
      {
        path: "user_register",
        name: "user_register",
        component: loadComponent("admin/UserRegister"),
      },
      {
        path: "access_history",
        name: "access_history",
        component: loadComponent("admin/AccessHistory"),
      },

      // regulation route
      {
        path: "update_report",
        name: "update_report",
        component: loadComponent("regulation/UpdateReport"),
      },
      {
        path: "rxswin_history",
        name: "rxswin_history",
        component: loadComponent("regulation/RxswinHistory"),
      },
      {
        path: "hash_history",
        name: "hash_history",
        component: loadComponent("regulation/HashHistory"),
      },

      // vsoc katri route
      {
        path: "katri_management",
        name: "katri_management",
        component: loadComponent("vsoc/katri/KatriManagement"),
      },
      {
        path: "katri_general_create",
        name: "katri_general_create",
        component: loadComponent("vsoc/katri/create/KatriReportCreate"),
      },
      {
        path: "katri_threat_create",
        name: "katri_threat_create",
        component: loadComponent("vsoc/katri/create/KatriThreatReportCreate"),
      },
      {
        path: "/incident/detail/GENERAL/:id",
        name: "katri_general_detail",
        component: loadComponent("vsoc/katri/detail/KatriReportRead"),
        props: true,
      },
      {
        path: "/incident/detail/THREAT/:id",
        name: "katri_threat_detail",
        component: loadComponent("vsoc/katri/detail/KatriThreatReportRead"),
        props: true,
      },
      {
        path: "/incident/update/GENERAL/:id",
        name: "katri_report_update",
        component: loadComponent("vsoc/katri/update/KatriReportUpdate"),
        props: true,
      },
      {
        path: "/incident/update/THREAT/:id",
        name: "threat_report_update",
        component: loadComponent("vsoc/katri/update/KatriThreatReportUpdate"),
        props: true,
      },
      {
        path: "/incident/close/GENERAL/:id",
        name: "katri_report_close",
        component: loadComponent("vsoc/katri/close/KatriReportClose"),
        props: true,
      },
      {
        path: "/incident/close/THREAT/:id",
        name: "threat_report_close",
        component: loadComponent("vsoc/katri/close/KatriThreatReportClose"),
        props: true,
      },
      // vsoc vulnerInfo route
      {
        path: "vulner_management",
        name: "vulner_management",
        component: loadComponent("vsoc/vulnerability/management/VulnerabilityManagement"),
      },
      {
        path: "/vulnerInfo/detail/:id",
        name: "vulner_detail",
        component: loadComponent("vsoc/vulnerability/detail/VulnerabilityDetail"),
        props: true,
      },
      // vsoc source route
      {
        path: "source_management",
        name: "source_management",
        component: loadComponent("vsoc/vulnerability/management/SourceManagement"),
      },
      {
        path: "source_register",
        name: "source_register",
        component: loadComponent("vsoc/vulnerability/create/SourceRegister"),
      },
      {
        path: "/source/detail/:sourceId",
        name: "source_detail",
        component: loadComponent("vsoc/vulnerability/detail/SourceDetail"),
        props: true,
      },
      {
        path: "/source/update/:sourceId",
        name: "source_update",
        component: loadComponent("vsoc/vulnerability/update/SourceUpdate"),
        props: true,
      },
      // vsoc trigger route
      {
        path: "trigger_management",
        name: "trigger_management",
        component: loadComponent("vsoc/vulnerability/management/TriggerManagement"),
      },
      {
        path: "trigger_register",
        name: "trigger_register",
        component: loadComponent("vsoc/vulnerability/create/TriggerRegister"),
      },
      {
        path: "/trigger/detail/:id",
        name: "trigger_detail",
        component: loadComponent("vsoc/vulnerability/detail/TriggerDetail"),
        props: true,
      },
      {
        path: "/trigger/update/:id",
        name: "trigger_update",
        component: loadComponent("vsoc/vulnerability/update/TriggerUpdate"),
        props: true,
      },
      // vsoc monitoring route
      {
        path: "monitoring_management",
        name: "monitoring_management",
        component: loadComponent("vsoc/monitoring/MonitoringManagement"),
      },
      {
        path: "monitoringEventReport/register/:matchedId/:keyword",
        name: "monitoring_event_register",
        component: loadComponent("vsoc/monitoring/create/MonitoringEventReport"),
        props: true,
      },
      {
        path: "/monitoringWeaknessReport/register/:eventReportId",
        name: "monitoring_weakness_register",
        component: loadComponent("vsoc/monitoring/create/MonitoringWeaknessReport"),
        props: true,
      },
      {
        path: "/monitoringVulnerabilityReport/register/:weaknessReportId",
        name: "monitoring_vulnerability_register",
        component: loadComponent("vsoc/monitoring/create/MonitoringVulnerabilityReport"),
        props: true,
      },
      {
        path: "/monitoringCyberReport/register/:vulnerabilityReportId",
        name: "monitoring_cyber_register",
        component: loadComponent("vsoc/monitoring/create/MonitoringIncidentResReport"),
        props: true,
      },
      {
        path: "/monitoringEventReport/detail/:eventReportId",
        name: "monitoring_event_detail",
        component: loadComponent("vsoc/monitoring/detail/MonitoringEventDetail"),
        props: true,
      },
      {
        path: "/monitoringWeaknessReport/detail/:weaknessReportId",
        name: "monitoring_weakness_detail",
        component: loadComponent("vsoc/monitoring/detail/MonitoringWeaknessDetail"),
        props: true,
      },
      {
        path: "/monitoringVulnerabilityReport/detail/:vulnerabilityReportId",
        name: "monitoring_vulner_detail",
        component: loadComponent("vsoc/monitoring/detail/MonitoringVulnerDetail"),
        props: true,
      },
      {
        path: "/monitoringCyberReport/detail/:cyberReportId",
        name: "monitoring_cyber_detail",
        component: loadComponent("vsoc/monitoring/detail/MonitoringIncidentResDetail"),
        props: true,
      },
      {
        path: "/monitoringEventReport/update/:eventReportId",
        name: "monitoring_event_update",
        component: loadComponent("vsoc/monitoring/update/MonitoringEventUpdate"),
        props: true,
      },
      {
        path: "/monitoringWeaknessReport/update/:weaknessReportId",
        name: "monitoring_weakness_update",
        component: loadComponent("vsoc/monitoring/update/MonitoringWeaknessUpdate"),
        props: true,
      },
      {
        path: "/monitoringVulnerabilityReport/update/:vulnerabilityReportId",
        name: "monitoring_vulner_update",
        component: loadComponent("vsoc/monitoring/update/MonitoringVulnerUpdate"),
        props: true,
      },
      {
        path: "/monitoringCyberReport/update/:cyberReportId",
        name: "monitoring_cyber_update",
        component: loadComponent("vsoc/monitoring/update/MonitoringIncidentResUpdate"),
        props: true,
      },
      // notification route
      {
        path: "notification_management",
        name: "notification_management",
        component: loadComponent("vsoc/notification/NotificationManagement"),
      },
      // permission route
      {
        path: "permission_management",
        name: "permission_management",
        component: loadComponent("vsoc/permission/PermissionManagement"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;