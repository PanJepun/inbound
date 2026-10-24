import { manager as hotels } from './itineraries/hotels.js';
import { manager as transport } from './itineraries/transport.js';
import { manager as tours } from './itineraries/tours.js';
import { manager as meals } from './itineraries/meals.js';
import { manager as guideFee } from './itineraries/guideFee.js';
import { manager as others } from './itineraries/others.js';
import { manager as optional } from './itineraries/optional.js';

window.recalcAllCosts = () => {
  const total = hotels.getNett() + transport.getNett() + tours.getNett() + meals.getNett() + guideFee.getNett() + others.getNett() + optional.getNett();
  document.getElementById('costPrice').value = total.toLocaleString() + '.00';
  document.getElementById('salesPriceId').value = document.getElementById('tourIDR').value; // 28jt
};