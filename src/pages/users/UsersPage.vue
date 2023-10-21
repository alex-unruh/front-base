<template>
  <PageHeader icon="people" title="Users" color="secondary" description="System Administration">
    <q-btn icon="add" flat title="Add new" class="q-mr-md" @click="create" />
    <q-input label="Search" dense filled v-model="filter" debounce="300">
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
  </PageHeader>

  <q-table v-if="!loading" :columns="columns" :filter="filter" :rows="items" row-key="id">
    <template v-slot:body-cell-manage="props">
      <q-td :props="props" class="q-gutter-x-sm">
        <q-btn icon="edit" color="primary" size="sm" padding="xs" title="Edit the user" @click="edit(props.row)" />

        <q-btn icon="delete" color="negative" size="sm" padding="xs" title="Remove user"
          @click="showConfirm(props.row)" />
      </q-td>
    </template>
  </q-table>

  <q-dialog v-model="showDialog" persistent>
    <CardForm :isUpdate="isUpdate" title="User" @on-create="store()" @on-update="update()">
      <q-input label="Name" v-model="user.name" :error-message="msg('name')" :error="hasError('name')" />
      <q-input label="E-mail" v-model="user.email" type="email" :error-message="msg('email')"
        :error="hasError('email')" />
      <q-input label="Password" v-model="user.password" type="password" :error-message="msg('password')"
        :error="hasError('password')" />
      <q-select label="Profile" v-model="user.profile" :options="profiles" :error-message="msg('profile')"
        :error="hasError('profile')" map-options emit-value />
    </CardForm>
  </q-dialog>

  <q-dialog v-model="confirmDialog" persistent>
    <card-confirm @on-confirm="destroy()" />
  </q-dialog>

  <q-inner-loading :showing="loading" label="Please wait..." />
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { PageHeader, CardForm, CardConfirm } from 'src/components';
import { useNotify } from 'src/uses';
import { useUsers } from 'src/services';

const { danger, success } = useNotify();

const service = useUsers();
const loading = ref(false);
const users = ref([]);
const showDialog = ref(false);
const confirmDialog = ref(false);
const profiles = ref([{ label: 'Administrator', value: 1 }, { label: 'Manager', value: 2 }, { label: 'Collaborator', value: 3 }]);
const defaultUser = { id: null, name: null, email: null, password: null, profile: 2 };
const user = ref(null);
const isUpdate = ref(false);
const defaultErrors = ref({ name: null, email: null, password: null, profile: null });
const errors = ref(null);
const searchResult = ref([]);
const searchString = ref([]);
const profileLabel = ref({ 1: 'Administrator', 2: 'Manager', 3: 'Collaborator' });
const filter = ref('');

const columns = ref([
  { name: 'id', required: true, label: 'ID', align: 'left', sortable: true, field: row => row.id },
  { name: 'name', required: true, label: 'NAME', align: 'left', sortable: true, field: row => row.name },
  { name: 'email', required: true, label: 'E-MAIL', align: 'left', sortable: true, field: row => row.email },
  { name: 'profile', required: false, label: 'PROFILE', align: 'left', sortable: true, field: row => profileLabel.value[row.profile] },
  { name: 'manage', label: 'MANAGE', align: 'center' }
]);

onMounted(async () => {
  await list();
  loading.value = false;
});

const items = computed(() => {
  return searchString.value.length === 0 ? users.value : searchResult.value;
})

/**
 * List all users
 */
async function list() {
  try {
    loading.value = true;
    let response = await service.list();
    users.value = response.data
  } catch (error) {
    console.log(error);
  }
}

/**
 * Stores a new user record
 */
async function store() {
  try {
    await service.store(user.value);
    onSuccess('User successfully created');
  } catch (error) {
    onError(error);
  }
}

/**
 * Update an existent user record
 */
async function update() {
  try {
    await service.update(user.value, user.value.id)
    onSuccess('User successfully updated');
  } catch (error) {
    onError(error);
  }
}

/**
 * Delete an user record
 * @param {number} id
 */
async function destroy() {
  try {
    await service.destroy(user.value);
    list();
    success('User successfully deleted');
  } catch (error) {
    if (error.response && error.response.status === 403) {
      return danger(error.response.data.message);
    }
    console.log(error);
    danger('Error on connect to database');
  } finally {
    showDialog.value = false;
    confirmDialog.value = false;
  }
}

/**
 * Show the form to insert a new user
 */
function create() {
  isUpdate.value = false;
  user.value = defaultUser;
  errors.value = defaultErrors.value;
  showDialog.value = true;
}

/**
 * Show the for to edit an existent user
 * @param {number} id
 */
function edit(userToEdit) {
  isUpdate.value = true;
  errors.value = defaultErrors.value;
  user.value = userToEdit;
  showDialog.value = true;
}

/**
 * Called on update or create success
 * @param {string} msg
 */
function onSuccess(msg) {
  showDialog.value = false;
  list();
  success(msg);
  loading.value = false;
}

/**
 * Called on update or create fails
 * @param {object} error
 */
function onError(error) {
  if (error.response && error.response.status === 422) return errors.value = error.response.data.errors;
  console.log(error);
  danger('Error on connect to database');
  loading.value = false;
}

/**
 * Return validation erros messages
 * @param {string} field
 */
function msg(field) {
  if (!errors.value[field]) return '';
  return errors.value[field][0];
}

/**
 * Check is a field has validation erros messages
 * @param {string} field
 */
function hasError(field) {
  if (!errors.value[field]) return false;
  return true;
}

/**
 * User id
 * @param {object} id
 */
function showConfirm(userToDelete) {
  confirmDialog.value = true;
  user.value = userToDelete;
}

/**
 * Filter search results
 * @param {string} text
 */
function search() {
  searchResult.value = filter(users.value, 'name', searchString.value);
}
</script>
