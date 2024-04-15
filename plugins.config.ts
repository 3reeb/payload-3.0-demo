import { webpackBundler } from '@payloadcms/bundler-webpack' // bundler-import
import { mongooseAdapter } from '@payloadcms/db-mongodb' // database-adapter-import
import { payloadCloud } from '@payloadcms/plugin-cloud'
import payloadSimpleRBAC, { starterRoles } from "@nouance/payload-simple-rbac";

import formBuilder from '@payloadcms/plugin-form-builder'
import nestedDocs from '@payloadcms/plugin-nested-docs'
import redirects from '@payloadcms/plugin-redirects'
import seo from '@payloadcms/plugin-seo'
import type { GenerateTitle } from '@payloadcms/plugin-seo/types'
import stripePlugin from '@payloadcms/plugin-stripe'
import { slateEditor } from '@payloadcms/richtext-slate' // editor-import
import dotenv from 'dotenv'
import path from 'path'
import { Plugin, buildConfig } from 'payload/config'
import { exportCollectionsPlugin } from "@newesissrl/payload-exportcollections-plugin";
import iframeTabsPlugin from '@nouance/payload-iframe-tabs-plugin'
import RelationshipEnhancerPlugin from "payload-relationship-enhancer";
// import { stateLettersMonitoring } from '@/state-letters-monitoring'

import Categories from './collections/Categories'
import { Media } from './collections/Media'
import Users from './collections/Users'
import BeforeDashboard from './components/BeforeDashboard'
import { createPaymentIntent } from './endpoints/create-payment-intent'
import { customersProxy } from './endpoints/customers'
import { productsProxy } from './endpoints/products'
import { Settings } from './globals/Settings'
import { priceUpdated } from './stripe/webhooks/priceUpdated'
import { productUpdated } from './stripe/webhooks/productUpdated'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import Header from './collections/Pages/Header'
import Footer from './collections/Pages/Footer'
import { samplePlugin } from '@/provider'
import { dashboardBuilder } from '@/dashboard-builder'
import { roleBasedSystemPlugin } from '@/role-based-authentication'
import { facebookBusinessManagement } from '@/facebook-business-management';

import { storeServicesPlugin } from '@/store-services'
import { systemMarketingPlugin } from '@/marketing'
import { systemHRPlugin } from '@/hr-system'
import { systemPlanesPlugin } from '@/goals-system'
import { tenancy } from '@/payload-tenancy'
import { systemMediaManagerPlugin } from '@/media-manager'
import { systemPlanesAnalysisPlugin } from '@/mohammed-nhmi-system'
import { inventoryManagementSystemPlugin } from '@/inventory-management-system'
import { purchaseSystemPlugin } from '@/purchases-management'
import { mailManagementPlugin } from '@/mail-manager'
import { userTenantManagement } from '@/user-tenant-management'
import { shipmentsManagementPlugin } from '@/shipments-system'
import { systemCommercePlugin } from '@/ecommerce-system'
import Configs from './collections/Configs'
import { addressFieldsPlugin } from '@/address-fields'
import { systemCommentsPlugin } from '@/comments-and-reviewing'
import { static_collectionsConfig, static_redirectsField, static_searchField, static_seoField } from './variables'
import { examSystemPlugin } from '@/examination-system'
import {SearchPlugin} from '@/plugin-search'
import { addAuthorFields } from '@/author-fields';
import GraphqlPlugin from '@innovixx/payload-graphql-view-plugin';
import _ from 'lodash'
import { payloadWorkflow } from 'payload-workflow'

import passwordProtection from 'payload-plugin-password-protection';

import {
  BlocksFeature,
  LinkFeature,
  UploadFeature,
  // ToolbarButton,
  AlignFeature,
  HeadingFeature,
  TreeviewFeature,
  OrderedListFeature,
} from '@payloadcms/richtext-lexical'
import {
  ToolbarButton
} from '@payloadcms/richtext-lexical/components'
import { Banner } from './blocks'
import { CallToAction } from './blocks'
import { itemsManagerFieldPlugin } from '@/items-field'
import { communitySystemPlugin } from '@/community'
import { UiForOrganization } from '@/user-resume'
import { auditManagementSystem } from '@/autdit-management-system'

import { platformConfigurations } from '@/platform-configurations';
import { assetManagementPlugin } from '@/assets-management-system';
import { pageBuilder } from '@/page-builder';
import {CamaIcon,CamaLogo} from '@/icons';
import { auditLogPlugin } from '@/audit-log';
import { documentsManagementSystem } from '@/document-management';
import { aiHelperPlugin } from '@/ai-helper';
import { approvalProcessPlugin } from '@/approval-process';
import deepFieldUpdate from './utilities/deepFieldUpdate';
import { worksheetPlugin } from '@/worksheet-management';
import { customersManagementSystem } from '@/crm-management-system';
import { subscriptionSystemPlugin } from '@/subscriptions-management';
import { websiteScrapperPlugin } from '@/website-scraper';
import { systemPostPlugin } from '@/blog-system';
import { reusableContentPlugin } from '@/reusable-content';
import { Config } from './payload-types';
import { ProjectManagement } from '@/project-management';

const generateTitle: GenerateTitle = () => {
  return 'My Store'
}
const generateDescription: GenerateTitle = () => {
  return 'My Store'
}
const generateImage: GenerateTitle = () => {
  return 'My Store'
}
const generateURL: GenerateTitle = () => {
  return 'My Store'
}

const mockModulePath = path.resolve(__dirname, './emptyModuleMock.js')

type KeyType = "ai_assistance" |
"user_tenant_management" |
"platform_configurations" |
"mail_management" |
"front_builder" |
"blog" |
"facebook_business" |
"asset_management" |
"exam_system" |
"audit_management" |
"iframe_tabs" |
"relationship_enhancer" |
"commerce" |
"workflow_process" |
"website_scrapper" |
"platform_workflow" |
"community_system" |
"shipments_management" |
"subscription_system" |
"purchase_management" |
"hr_management" |
"form_builder" |
"marketing" |
"completed_crm" |
"strip_payment" |
"inventory_management" |
"store_services" |
"dashboard_builder" |
"address_management" |
"comment_management" |
"items_manager" |
"graphql_management" |
"seo" |
"redirects" |
"nestedDocs" |
"template" |
"global_search" |
"worksheet" |
"validate_collections_relations" |
"role_based_access_control" |
"tenant_configuration" |
"audit_logs_monitoring" |
"state_letters_monitoring" |
  "document_author_management" | 
  "reusable_content" |
  "documents_management" | 
  "project_management"

type PluginConfig<T> = {
  enabled: boolean;
  is_paid: boolean;
  key: KeyType;
  plugin: (...args: any[]) => void; // You may need to adjust this type depending on the type of your plugins
  parameter: T;
};



type PluginConfigArray<T> = PluginConfig<T>[];


const plugins:PluginConfigArray<{}> = [
  {
    enabled: true,
    is_paid: true,
    key: 'ai_assistance',
    plugin: aiHelperPlugin,
    parameter: {}
  },
  // {
  //   enabled: true,
  //   is_paid: false,
  //   key: 'state_letters_monitoring',
  //   plugin: stateLettersMonitoring,
  //   parameter: {}
  // },
  {
    enabled: true,
    is_paid: true,
    key: 'documents_management',
    plugin: documentsManagementSystem,
    parameter: {}
  },
  {
    enabled: true,
    is_paid: true,
    key: 'user_tenant_management',
    plugin: userTenantManagement,
    parameter: {}
  },
  {
    enabled: true,
    is_paid: false,
    key: 'platform_configurations',
    plugin: platformConfigurations,
    parameter: {}
  },
  {
    enabled: true,
    key: 'mail_management',
    is_paid: true,
    plugin: mailManagementPlugin,
    parameter: { enabled: true }
  },
  {
    enabled: true,
    is_paid: true,
    key: 'front_builder',
    plugin: pageBuilder,
    parameter: {}
  },
  {
    enabled: true,
    is_paid: true,
    key: 'blog',
    plugin: systemPostPlugin,
    parameter: {}
  },
  {
    enabled: true,
    is_paid: true,
    key: 'facebook_business',
    plugin: facebookBusinessManagement,
    parameter: {}
  },
  {
    enabled: true,
    key: 'asset_management',
    is_paid: true,
    plugin: assetManagementPlugin,
    parameter: {}
  },
  {
    enabled: true,
    key: 'exam_system',
    is_paid: true,
    plugin: examSystemPlugin,
    parameter: {}
  },
  {
    enabled: true,
    key: 'audit_management',
    is_paid: true,
    plugin: auditManagementSystem,
    parameter: {}
  },
  {
    enabled: true,
    key: 'iframe_tabs',
    is_paid: true,
    plugin: iframeTabsPlugin,
    parameter: {
      enabled: true,
      collections: [
        {
          slug: 'items',
          tabs: [
            {
              name: 'FirstYoutube',
              label: 'Michael Scott',
              path: '/michael-scott',
              src: 'https://www.youtube.com/embed/B9MNITrHu9E',
            },
          ],
        },
      ],
      globals: [
        {
          slug: 'settings',
          tabs: [
            {
              name: 'Spongebob',
              label: 'Spongebob',
              path: '/spongebob',
              src: 'https://www.youtube.com/embed/hzond0fF4MM',
              iframeProps: {
                height: 1080,
                width: 1920,
                frameBorder: '0',
                style: { aspectRatio: '19/10', maxWidth: '100%', height: 'auto' },
              },
            },
            {
              name: 'FigmaDesign',
              label: 'Figma Design',
              path: '/design',
              code: `<iframe style="border: 1px solid rgba(0, 0, 0, 0.1); width: 100%; height: auto; aspect-ratio: 19/10;" width="800" height="450" src="http://localhost:3000/admin" allowfullscreen></iframe>`,
            },
          ],
        },
      ],
    }
  },
  {
    enabled: true,
    key: 'relationship_enhancer',
    is_paid: true,
    plugin: (param:any)=> RelationshipEnhancerPlugin,
    parameter: {}
  },
  {
    enabled: true,
    is_paid: true,
    key: 'commerce',
    plugin: systemCommercePlugin,
    parameter: {
      relationField: {
        collectionsSlug: ['products'],
        overrides: {
          type: 'relationship',
          relationTo: 'brands',
          name: 'brand',
          admin: {
            position: 'sidebar',
          },
        },
      },
    }
  },
  {
    enabled: true,
    is_paid: true,
    key: 'workflow_process',
    plugin: approvalProcessPlugin,
    parameter: {}
  },
  {
    enabled: true,
    is_paid: true,
    key: 'website_scrapper',
    plugin: websiteScrapperPlugin,
    parameter: {}
  },
  {
    enabled: true,
    is_paid: true,
    key: 'platform_workflow',
    plugin: payloadWorkflow,
    parameter: {
      orders: {
        statuses: [
          { value: 'order_created', label: 'order_created' },
          { value: 'order_accepted', label: 'Order accepted' },
          { value: 'cancel', label: 'Canceling' },
          { value: 'on_order_completed', label: 'on_order_completed' },
          { value: 'on_order_completed_ffm', label: 'on_order_completed_ffm' },
          { value: 'payment_denied', label: 'Payment denied	' },
          { value: 'payment_approved', label: 'Payment approved' },
          { value: 'payment_pending', label: 'Payment pending' },
          { value: 'request_cancel', label: 'Cancellation requested' },
          { value: 'canceled', label: 'canceled' },
          { value: 'window_to_change_payment', label: 'Window to change payment' },
          { value: 'window_to_change_seller', label: 'Window to change seller' },
          { value: 'waiting_for_authorization', label: 'Waiting for seller confirmation' },
          { value: 'waiting_for_fulfillment', label: 'waiting_for_fulfillment' },
          { value: 'waiting_ffmt_authorization', label: 'waiting_ffmt_authorization' },
          {
            value: 'waiting_for_manual_authorization',
            label: 'Waiting for fulfillment authorization',
          },
          { value: 'authorize_fulfillment', label: 'Authorize fulfillment' },
          { value: 'draft', label: 'Draft' },
          { value: 'window_to_cancel', label: 'Cancellation window' },
          { value: 'ready_for_invoicing', label: 'Ready For invoicing' },
          { value: 'invoice', label: 'Verifying invoice' },
          { value: 'invoiced', label: 'invoiced' },
          { value: 'ready_for_handling', label: 'Ready for handling' },
          { value: 'start_handling', label: 'Start handling' },
          { value: 'cancellation_requested', label: 'Cancellation requested' },
          { value: 'waiting_for_mkt_authorization', label: 'waiting_for_mkt_authorization' },
          { value: 'waiting_seller_handling', label: 'waiting_seller_handling' },
          { value: 'handling', label: 'Handling shipping' },
          { value: 'waiting_for_payment_approval', label: 'Approve payment' },
          {
            value: 'waiting_for_seller_cancellation_decision',
            label: 'Waiting for the seller decision',
          },
          { value: 'ready_for_review', label: 'Ready for review' },
        ],
        defaultStatus: 'order_created',
        hideNoStatusColumn: false,
      },
      inventoryInflows: {
        statuses: [
          {
            value: 'receiveRequest',
            label: 'receiveRequest',
          },
          {
            value: 'received',
            label: 'received',
          },
          {
            value: 'inspectionRequest',
            label: 'inspectionRequest',
          },
          {
            value: 'inInspection',
            label: 'inInspection',
          },
          {
            value: 'confirmedInspection',
            label: 'confirmedInspection',
          },
          {
            value: 'verified',
            label: 'verified',
          },
        ],
        defaultStatus: 'receiveRequest',
        hideNoStatusColumn: false,
      },
      inventories: {
        statuses: [
          {
            value: 'draft',
            label: 'draft',
          },{
            value: 'change_request',
            label: 'change_request',
          },
          {
            value: 'waiting_for_approval',
            label: 'waiting_for_approval',
          },
          {
            value: 'deleted',
            label: 'deleted',
          },{
            value: 'rejected',
            label: 'rejected',
          },
          {
            value: 'verified',
            label: 'verified',
          },{
            value: 'approved',
            label: 'approved',
          },
        ],
        defaultStatus: 'waiting',
        hideNoStatusColumn: false,
      },
      inventoryOutflows: {
        statuses: [
          {
            value: 'shipped',
            label: 'shipped',
          },
          {
            value: 'in-transit',
            label: 'in Transit',
          },
          {
            value: 'delivered',
            label: 'delivered',
          },
        ],
        defaultStatus: 'shipped',
        hideNoStatusColumn: false,
      },
      inventoryAudit: {
        statuses: [
          {
            value: 'audit-request',
            label: 'audit Request',
          },
          {
            value: 'in-auditing',
            label: 'in Auditing',
          },
          {
            value: 'finish-auditing',
            label: 'finish Auditing',
          },
          {
            value: 'approved',
            label: 'approved',
          },
          {
            value: 'rejected',
            label: 'rejected',
          },
          {
            value: 'canceled',
            label: 'canceled',
          },
        ],
        defaultStatus: 'audit-request',
        hideNoStatusColumn: false,
      },
      inventoryRequests:{
        statuses: [
          {
            value: 'draft',
            label: 'draft',
          },{
            value: 'change_request',
            label: 'change_request',
          },
          {
            value: 'waiting_for_approval',
            label: 'waiting_for_approval',
          },
          {
            value: 'deleted',
            label: 'deleted',
          },{
            value: 'rejected',
            label: 'rejected',
          },
          {
            value: 'verified',
            label: 'verified',
          },{
            value: 'approved',
            label: 'approved',
          },
          
          // {
          //   value: 'idle',
          //   label: 'Idle',
          // },
          // {
          //   value: 'request',
          //   label: 'Request',
          // },
          // {
          //   value: 'complete',
          //   label: 'complete',
          // },
          // {
          //   value: 'approved',
          //   label: 'approved',
          // },
          // {
          //   value: 'rejected',
          //   label: 'rejected',
          // },
          // {
          //   value: 'canceled',
          //   label: 'canceled',
          // },
        ],
        defaultStatus: 'draft',
        hideNoStatusColumn: false,
      },
      // documents:{
      //   statuses: [
      //     {
      //       value: 'draft',
      //       label: 'draft',
      //     },{
      //       value: 'change_request',
      //       label: 'change_request',
      //     },
      //     {
      //       value: 'waiting_for_approval',
      //       label: 'waiting_for_approval',
      //     },
      //     {
      //       value: 'deleted',
      //       label: 'deleted',
      //     },{
      //       value: 'rejected',
      //       label: 'rejected',
      //     },
      //     {
      //       value: 'verified',
      //       label: 'verified',
      //     },{
      //       value: 'approved',
      //       label: 'approved',
      //     },
          
      //   ],
      //   defaultStatus: 'draft',
      //   hideNoStatusColumn: false,
      // },
      purchaseRequests: {
        statuses: [
          {
            value: 'pending',
            label: 'pending',
          },
          {
            value: 'in_review',
            label: 'in review',
          },
          {
            value: 'approved',
            label: 'approved',
          },
          {
            value: 'rejected',
            label: 'rejected',
          },
          {
            value: 'canceled',
            label: 'canceled',
          },
        ],
        defaultStatus: 'pending',
        hideNoStatusColumn: false,
      },
      purchaseOrders: {
        statuses: [
          {
            value: 'underReview',
            label: 'underReview',
          },
          {
            value: 'approved',
            label: 'approved',
          },
          {
            value: 'inProgress',
            label: 'inProgress',
          },
          {
            value: 'received',
            label: 'received',
          },
          {
            value: 'rejected',
            label: 'rejected',
          },
          {
            value: 'canceled',
            label: 'canceled',
          },
        ],
        defaultStatus: 'pending',
        hideNoStatusColumn: false,
      },
    }
  },
  {
    plugin: communitySystemPlugin,
    enabled: true,
    is_paid: true,
    key: 'community_system',
    parameter: {}
  },
  {
    plugin: shipmentsManagementPlugin,
    enabled: true,
    is_paid: true,
    key: 'shipments_management',
    parameter: {}
  },
  {
    plugin: ProjectManagement,
    enabled: true,
    is_paid: true,
    key: 'project_management',
    parameter: {}
  },
  {
    enabled: true,
    is_paid: true,
    key: 'subscription_system',
    plugin: subscriptionSystemPlugin,
    parameter: {}
  },
  {
    enabled: true,
    is_paid: true,
    key: 'purchase_management',
    plugin: purchaseSystemPlugin,
    parameter: {}
  },
  {
    enabled: true,
    is_paid: true,
    key: 'hr_management',
    plugin: systemHRPlugin,
    parameter: {}
  },
  {
    enabled: true,
    is_paid: true,
    key: 'form_builder',
    plugin:  formBuilder,
    parameter: {
      fields: [
        {
          fields: [
            {
              fields: [
                {
                  ...{
                    name: 'name',
                    label: 'Name (lowercase, no special characters)',
                    required: true,
                    type: 'text',
                  },
                  admin: {
                    width: '50%',
                  },
                },
                {
                  ...{
                    name: 'label',
                    label: 'Label',
                    localized: true,
                    type: 'text',
                  },
                  admin: {
                    width: '50%',
                  },
                },
              ],
              type: 'row',
            },
            {
              fields: [
                {
                  ...{
                    name: 'width',
                    label: 'Field Width (percentage)',
                    type: 'number',
                  },
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'defaultValue',
                  admin: {
                    width: '50%',
                  },
                  label: 'Default Value',
                  localized: true,
                  type: 'text',
                },
              ],
              type: 'row',
            },
            {
              name: 'options',
              fields: [
                {
                  fields: [
                    {
                      name: 'label',
                      admin: {
                        width: '50%',
                      },
                      label: 'Label',
                      localized: true,
                      required: true,
                      type: 'text',
                    },
                    {
                      name: 'value',
                      admin: {
                        width: '50%',
                      },
                      label: 'Value',
                      required: true,
                      type: 'text',
                    },
                  ],
                  type: 'row',
                },
              ],
              label: 'Select Attribute Options',
              labels: {
                plural: 'Options',
                singular: 'Option',
              },
              type: 'array',
            },
            {
              name: 'required',
              label: 'Required',
              type: 'checkbox',
            }
          ],
          labels: {
            plural: 'Radio Fields',
            singular: 'Radio',
          },
          slug: 'radio',
        }
      ],
      formOverrides: {
        fields: [

          {
            type: 'richText',
            name: 'leader'
          }
        ],
        admin: {
          group: 'form_builder',
        },
      },
      formSubmissionOverrides: {
        admin: {
          group: 'form_builder',
        },
      },
    }
  },
  {
    plugin: systemMarketingPlugin,
    enabled: true,
    is_paid: true,
    key: 'marketing',
    parameter: {}
  },
  {
    plugin: customersManagementSystem,
    enabled: true,
    is_paid: true,
    key: 'completed_crm',
    parameter: {}
  },
  // {
  //   enabled: true,
  //   is_paid: true,
  //   key: 'strip_payment',
  //   plugin: stripePlugin,
  //   parameter: {
  //     stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
  //     isTestKey: Boolean(process.env.PAYLOAD_PUBLIC_STRIPE_IS_TEST_KEY),
  //     stripeWebhooksEndpointSecret: process.env.STRIPE_WEBHOOKS_SIGNING_SECRET,
  //     rest: false,
  //     webhooks: {
  //       'product.created': productUpdated,
  //       'product.updated': productUpdated,
  //       'price.updated': priceUpdated,
  //     },
  //   }
  // },
  {
    plugin: inventoryManagementSystemPlugin,
    enabled: true,
    is_paid: true,
    key: 'inventory_management',
    parameter: {}
  },
  {
    plugin: storeServicesPlugin,
    enabled: true,
    is_paid: true,
    key: 'store_services',
    parameter: {}
  },
  {
    enabled: true,
    is_paid: true,
    plugin: dashboardBuilder,
    key: 'dashboard_builder',
    parameter: {}
  },
  {
    enabled: true,
    is_paid: true,
    key: 'address_management',
    plugin: addressFieldsPlugin,
    parameter: {
      enabled: true,
      is_paid: true,
      key:'address_management',
      collections: ['users', 'warehouses', 'pickupPoints', 'shipments', 'warehouses', 'orders', 'customers'],
      fields: { shipments: ['pickUpLocation', 'deliveryLocation'], 'orders': ['shippingAddress'] }
    }
  },
  {
    plugin: systemCommentsPlugin,
    enabled: true,
    is_paid: true,
    key: 'comment_management',
    parameter: {}
  },
  {
    plugin: reusableContentPlugin,
    enabled: true,
    is_paid: true,
    key: 'reusable_content',
    parameter: {}
  },
  {
    plugin: itemsManagerFieldPlugin,
    enabled: true,
    is_paid: true,
    key: 'items_manager',
    parameter: {}
  },
  {
    plugin: GraphqlPlugin,
    enabled: true,
    is_paid: true,
    key: 'graphql_management',
    parameter: {
      collections: ['pages','tenants']
    }
  },
  {
    plugin: seo,
    enabled: true,
    is_paid: true,
    key: 'seo',
    parameter: {
      collections: _.intersection(static_seoField, static_collectionsConfig[process.env.SAAS_MODE]),
      generateTitle,
      uploadsCollection: 'media',
    }
  },
  {
    plugin: redirects,
    enabled: true,
    is_paid: true,
    key: 'redirects',
    parameter: {
      overrides: {
        admin: {
          group: 'Intelligent Search',
        },
      },
      collections: _.intersection(static_redirectsField, static_collectionsConfig[process.env.SAAS_MODE]),
    }
  },
  {
    plugin: nestedDocs,
    enabled: true,
    is_paid: true,
    key: 'nestedDocs',
    parameter: {
      collections:  _.intersection(['projects','tasks','audits','pages', 'countriesAndCities', 'categories', 'tenants', 'structures', 'planes', 'warehouses'], static_collectionsConfig[process.env.SAAS_MODE]),
      generateLabel: (_, doc) => doc?.title ?? doc?.subject ?? doc?.name,
      generateURL: (docs) => docs.reduce((url, doc) => `${url}-${doc.slug}`, ''),
    }
  },
  {
    plugin: samplePlugin,
    enabled: true,
    is_paid: true,
    key: 'template',
    parameter: {
      groups: {
        "all": [
          'social_media_management',
          'inventory_management',
          'store',
          'organization_management',
          'project_management',
          'examination',
          'assets_management',
          'audit_management',
          'marketing_system',
          'intelligent_search',
          'shipments_management',
          'purchases_management',
          'document_management_system',
          'blog_management',
          'community',
          'store_services',
          'scrapper',
          'customer_relationship_management',
        ],
        'general_config': ['website_settings'],

        'fullSystem': [
          'general_config',
          'entitlements',
          'front_builder',
          'advanced_config',
          'universal_settings',
          'form_builder',
        ],

      }
    }
  },
  {
    plugin: SearchPlugin,
    enabled: true,
    is_paid: true,
    key: 'global_search',
    parameter: {
      searchOverrides: {
        admin: {
          group: 'Intelligent Search',
        },
      },
      collections: _.intersection(static_searchField, static_collectionsConfig[process.env.SAAS_MODE]),
    }
  },
  {
    plugin: worksheetPlugin,
    enabled: true,
    is_paid: true,
    key: 'worksheet',
    parameter: {}
  },
  {
    enabled: true,
    is_paid: true,
    key: 'validate_collections_relations',
    plugin: (data:any) => incomingConfig => {
      let config = { ...incomingConfig }
      const objOfValue = {
        'categories': { label: 'categories', value: 'categories' },
        'products': { label: 'Products', value: 'products' },
        'posts': { label: 'posts', value: 'posts' },
        'case-studies': { label: 'case-studies', value: 'case-studies' }
      };
      var col = config.collections.filter(collection =>
        ['categories','case-studies','pages', 'reusable-content', 'posts', 'products'].includes(collection.slug)
      ).map(collection => collection.slug);

      const relevantSlugs = new Set(col.filter(item => ['categories', 'case-studies', 'posts', 'products'].includes(item)));

      const updatedCollections = (config.collections || []).map(collection => {
        if (relevantSlugs.has(collection.slug)) {
          collection.fields = deepFieldUpdate(
            collection.fields,
            ['selectedDocs', 'populatedDocs', 'relationTo'],
            (old, target) => {
              if (['selectedDocs', 'populatedDocs'].includes(target)) {
                old.relationTo = _.uniq([...old.relationTo, ...Array.from(relevantSlugs)]);
              } else if (['relationTo'].includes(target)) {
                old.options = _.uniq([...old.options, ...Array.from(relevantSlugs).map(item => objOfValue[item]).filter(Boolean)]);
              }
              return old;
            }
          );
        }
        return collection;
      });
      config.collections = updatedCollections;

      return config
    },
    parameter: {}
  },
  {
    enabled: true,
    is_paid: true,
    key: 'role_based_access_control',
    plugin: roleBasedSystemPlugin,
    parameter: <{ enableAccessControlManagement: boolean, excludedCollections: Array<keyof Config['collections']> }>({
      enableAccessControlManagement: false,
      excludedCollections: ['users','userTenants','tenants','media','platformSettings','structures','reusable-content','configurationRegistry','themeConfigurations']
    })
  },
  {
    enabled: true,
    is_paid: true,
    key: 'tenant_configuration',
    plugin: tenancy,
    parameter: ({isolationStrategy: 'domain',sharedCollections:['roles','permissions','flags']})
  },
  {
    enabled: true,
    is_paid: true,
    key: 'audit_logs_monitoring',
    plugin: auditLogPlugin,
    parameter: {}
  },
  {
    enabled: false,
    is_paid: true,
    key: 'document_author_management',
    plugin: addAuthorFields,
    parameter: {
      excludedCollections: ['users', 'tenants', 'userTenants'],
      excludedGlobals:['entitlementsMap'],
      showInSidebar: true,

      // The 'Created By' field should be editable for posts
      createdByFieldEditable: (slug: string) => slug === 'posts',

      // Use a function to determine the 'Created By' label
      createdByLabel: (slug: string) => {
        if (slug === 'posts') {
          return { en: 'Posted By', ar: 'نشر بواسطة' };
        }
        if (slug === 'orders') {
          return { en: 'ordered Created By', ar: 'تم الطلب من قبل' };
        }

        return { en: 'Created By', ar: 'انشاءت بواسطة' };
      },

      // Internationalization of labels is also supported
      updatedByLabel: { en: 'Updated By', ar: 'تم تحديثها بواسطة' },

      fieldAccess: ({ req: { user } }) => { return true }
    }
  }
]

// type KeyType = typeof plugins[number]['key'];



export default function executePluginsByKey(params: { parameter?: any, key: KeyType }[]):Plugin[] {
  
  const plugins_filter = []

  params.forEach(({key,parameter}) => {
    const obj = plugins.find(obj => obj.key === key);
    if (obj && obj.enabled) {
      plugins_filter.push(obj.plugin(obj.parameter))
    } else {
      console.log("Plugin not found for key:");
    }
  });

  return plugins_filter
}
