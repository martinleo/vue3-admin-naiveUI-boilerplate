<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const emit = defineEmits(["sidebarToggle"]);
const props = defineProps({
  menuItems: {
    type: Array,
    required: true,
  },
  sidebarOpen: {
    type: Boolean,
  },
  isMobile: {
    type: Boolean,
  },
});

const menu = ref(props.menuItems);
const route = useRoute();
const router = useRouter();

function toggleSidebar() {
  emit("sidebarToggle");
}

function handleListItemClick(pageTo) {
  router.push({ path: pageTo });
  props.isMobile && emit("sidebarToggle");
}
</script>

<template>
  <div
    :class="[
      'mxl-layout-sidebar',
      sidebarOpen ? '' : 'mxl-layout-sidebar--closed',
    ]"
  >
    <div class="mxl-layout-sidebar__header">
      <slot />
    </div>
    <div class="mxl-layout-sidebar__menu">
      <div
        v-for="section in menu"
        :key="section.section"
        class="mxl-layout-sidebar__menu-section"
      >
        <h5>{{ section.section }}</h5>
        <ul id="menu-list" class="mxl-layout-sidebar__menu-list">
          <div v-for="item in section.options" :key="item.id">
            <!-- case of option with subchildren -->
            <li
              v-if="item.children && item.children.length > 0"
              class="mxl-layout-sidebar__menu-button has-children"
            >
              <input type="checkbox" :name="item.display" :id="item.display" />
              <label :for="item.display" class="">
                <i
                  v-if="item.icon"
                  :class="['mxl-layout-sidebar__button-icon', item.icon]" style="fontSize: 2rem"
                ></i>
                {{ item.display }}
                <i
                  class="mxl-layout-sidebar__button-chevron ph-caret-right"
                  style="fontsize: 1rem"
                ></i>
              </label>
              <ul
                v-if="item.children && item.children.length > 0"
                class="mxl-layout-sidebar__sublist"
              >
                <li
                  v-for="child in item.children"
                  :key="child.display"
                  class="mxl-layout-sidebar__menu-button"
                  @click="handleListItemClick(child.to)"
                >
                  <i
                    v-if="child.icon"
                    :class="['mxl-layout-sidebar__button-icon', child.icon]"
                  ></i>
                  {{ child.display }}
                </li>
              </ul>
            </li>
            <!-- case of option without subchildren -->
            <li
              v-else
              @click="handleListItemClick(item.to)"
              :class="[
                route.path.startsWith(item.to) ? 'active' : '',
                'mxl-layout-sidebar__menu-button',
              ]"
            >
              <i
                v-if="item.icon"
                :class="['mxl-layout-sidebar__button-icon', item.icon]"  style="fontSize: 2rem" 
              ></i>
              {{ item.display }}
            </li>
          </div>
        </ul>
      </div>
    </div>
  </div>
  <div
    :class="[
      'mxl-layout-sidebar__backdrop',
      sidebarOpen ? '' : 'mxl-layout-sidebar__backdrop--hidden',
    ]"
    @click="toggleSidebar"
  ></div>
</template>



<style lang="scss">

.mxl-layout-sidebar {
  background: $mxl-sidebar-bg;
  box-shadow: 0 4px 24px 0 rgba(34, 41, 47, 0.1);
  height: 100%;
  position: fixed;
  width: $mxl-sidebar-width;
  transition: transform 0.3s;
  z-index: $mxl-zi-sidebar;

  &.mxl-layout-sidebar--closed {
    transform: translateX(-250px);
  }

  .mxl-layout-sidebar__header {
    background: $mxl-sidebar-bg;
    height: $mxl-header-height;
  }

  .mxl-layout-sidebar__menu {
    margin: 0px 10px;

    h5 {
      color: $mxl-sidebar-font-color;
      font-weight: 600;
      font-size: 12px;
      text-transform: uppercase;
      opacity: 0.5;
      padding-left: 1em;
    }

    .mxl-layout-sidebar__menu-section {
      margin-top: 1.5em;

      .mxl-layout-sidebar__menu-list {
        margin-top: 1em;
      }

      .mxl-layout-sidebar__menu-button {
        align-items: flex-start;
        border: none;
        color: $mxl-sidebar-font-color;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        line-height: 20px;
        padding: 10px;
        text-decoration: none;
        transition: 0.15s padding ease-out;

        .mxl-layout-sidebar__button-icon {
          font-size: 1.1rem;
          margin-right: 10px;
        }

        &:hover {
          padding-left: 13px;
        }

        &.active {
          color: white;
          font-weight: 600;
          background: $mxl-sidebar-selected-button-color;
          box-shadow: 0 0 10px 1px $mxl-sidebar-selected-button-color-glow;
          border-radius: 4px;
        }

        &.has-children {
          padding: 0px;
          flex-direction: column;
        }

        label {
          align-items: center;
          display: flex;
          cursor: pointer;
          height: 100%;
          padding: 10px;
          text-decoration: none;
          transition: 0.15s padding ease-out;
          width: 100%;

          .mxl-layout-sidebar__button-chevron {
            position: absolute;
            float: right;
            right: 20px;
            transition: transform 0.25s ease;
          }

          &:hover {
            padding-left: 13px;
          }
        }

        input {
          // keep hidden
          display: none;

          &:checked + label > i {
            transform: rotate(90deg);
          }
        }

        .mxl-layout-sidebar__sublist {
          align-self: center;
          background: rgba(121, 89, 89, 0.03);
          border-radius: 5px;
          display: none;
          margin: 10px;
          width: 100%;
        }

        input:checked ~ .mxl-layout-sidebar__sublist {
          // show children when item is checked
          display: block;
        }
      }
    }
  }
}

.mxl-layout-sidebar__backdrop {
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  z-index: $mxl-zi-backdrop;
  height: 0px;
  width: 0px;
  transition: opacity 0.25s ease;
  opacity: 0;

  &.mxl-layout-sidebar__backdrop--hidden {
    height: 0px;
    width: 0px;
    opacity: 0;
  }

  @media (max-width: $mxl-sidebar-mobile-break) {
    height: 100vh;
    width: 100vw;
    opacity: 1;
  }
}
</style>