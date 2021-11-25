import './util.js';
import './miniatures.js';
import './effect-overlay.js';
import './scale.js';
import './photo-view.js';
import './filter-images.js';
import './sending-form.js';
import './api.js';
import './upload-file.js';
import './user-form.js';
import { closeUserForm } from './upload-file.js';
import { setFormSubmit } from './user-form.js';
import { renderMiniaturesList } from './miniatures.js';
import { getData } from './api.js';

getData((miniatures) => {
  renderMiniaturesList(miniatures);
});

setFormSubmit(closeUserForm);
