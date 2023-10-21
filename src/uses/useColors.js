
export default function useColors() {

  /**
  * Get the badge color from item status
  * @param {string} slug
  */
  function statusColor(slug) {
    let colors = { to_do: 'orange', running: 'primary', blocked: 'negative', done: 'positive' };
    let color = colors[slug];
    return color;
  }

  /**
   * Get the badge color from item priority
   * @param {number} priority
   */
  function priorityColor(priority) {
    let colors = { 1: 'positive', 2: 'warning', 3: 'negative' };
    let color = colors[priority];
    return color;
  }

  /**
   * Get the badge color from item priority
   * @param {object} item
   */
  function hoursColor(item) {
    return parseInt(item.spended_hours) > parseInt(item.estimated_hours) ? 'negative' : 'positive';
  }

  /**
   * Check if a due date is lower than today and the status is not "done"
   * @param {string} date Date in format Y-m-d
   * @param {string} status Must be [ to_do, running, blocked, done ]
   * @returns {string}
   */
  function endColor(date, status) {
    let today = new Date();
    let dateToCompare = new Date(date);
    return (dateToCompare < today) && status != 'done' ? 'negative' : 'positive';
  }

  return { statusColor, priorityColor, hoursColor, endColor }

}
