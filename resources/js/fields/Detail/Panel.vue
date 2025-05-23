<template>
  <div :dusk="`${panel.attribute}-panel`">
    <slot>
      <div class="flex items-center">
        <Heading :level="1" v-text="panel.name" />

        <button
          v-if="panel.collapsable"
          @click="toggleCollapse"
          class="rounded border border-transparent h-6 w-6 ml-1 inline-flex items-center justify-center focus:outline-none focus:ring focus:ring-primary-200"
          :aria-label="__('Toggle Collapsed')"
          :aria-expanded="collapsed === false ? 'true' : 'false'"
        >
          <CollapseButton :collapsed="collapsed" />
        </button>
      </div>

      <p
        v-if="panel.helpText && !collapsed"
        class="text-gray-500 text-sm font-semibold italic"
        :class="panel.helpText ? 'mt-1' : 'mt-3'"
        v-html="panel.helpText"
      />
    </slot>

    <Card
      class="mt-3 py-2 px-6 divide-y divide-gray-100 dark:divide-gray-700 gridder"
      :class="getGridderClass(panel, true)"
      v-if="!collapsed && fields.length > 0"
    >
      <component
        :key="index"
        v-for="(field, index) in fields"
        :index="index"
        :is="resolveComponentName(field)"
        :resource-name="resourceName"
        :resource-id="resourceId"
        :resource="resource"
        :field="field"
        @actionExecuted="actionExecuted"
        :class="getGridderClass(field, false)"
      />

      <div
        v-if="shouldShowShowAllFieldsButton"
        class="-mx-6 border-t border-gray-100 dark:border-gray-700 text-center rounded-b"
      >
        <button
          type="button"
          class="block w-full text-sm link-default font-bold py-2 -mb-2"
          @click="showAllFields"
        >
          {{ __('Show All Fields') }}
        </button>
      </div>
    </Card>
  </div>
</template>

<script>
import { Collapsable, BehavesAsPanel } from '@/mixins'

export default {
  mixins: [Collapsable, BehavesAsPanel],

  methods: {
    /**
     * Resolve the component name.
     */
    resolveComponentName(field) {
      return field.prefixComponent
        ? 'detail-' + field.component
        : field.component
    },

    /**
     * Show all of the Panel's fields.
     */
    showAllFields() {
      return (this.panel.limit = 0)
    },

      getGridderClass(field, isPanel) {
        if (field.gridder) {
            let classes = isPanel ? "gridder-panel " : "gridder-field ";
            let cols_prefix = isPanel ? 'gridder-cols-panel' : 'gridder-cols-field';

            if (field.gridder.type) {
                classes += `gridder-${field.gridder.type}`
            }

            if (field.gridder.cols) {
                if (field.gridder.cols.default) {
                    classes += ` ${cols_prefix}-${field.gridder.cols.default}`
                }

                if (field.gridder.cols.sm) {
                    classes += ` ${cols_prefix}-sm-${field.gridder.cols.sm}`
                }

                if (field.gridder.cols.md) {
                    classes += ` ${cols_prefix}-md-${field.gridder.cols.md}`
                }

                if (field.gridder.cols.lg) {
                    classes += ` ${cols_prefix}-lg-${field.gridder.cols.lg}`
                }
            }

            return classes;
        } else {
            return "gridder-field";
        }
      }
  },

  computed: {
    localStorageKey() {
      return `nova.panels.${this.panel.attribute}.collapsed`
    },

    collapsedByDefault() {
      return this.panel?.collapsedByDefault ?? false
    },

    /**
     * Limits the visible fields.
     */
    fields() {
      if (this.panel.limit > 0) {
        return this.panel.fields.slice(0, this.panel.limit)
      }

      return this.panel.fields
    },

    /**
     * Determines if should display the 'Show all fields' button.
     */
    shouldShowShowAllFieldsButton() {
      return this.panel.limit > 0
    },

      columns() {
        return 1;
      }
  },
}
</script>
