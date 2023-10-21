
import { Notify } from "quasar";

export default function useNotify() {

  function danger(message, position = 'top') {
    return Notify.create({ message: message, color: 'negative', position: position, icon: 'error_outline' });
  }

  function warning(message, position = 'top') {
    return Notify.create({ message: message, color: 'warning', position: position, icon: 'report_problem' });
  }

  function success(message, position = 'top') {
    return Notify.create({ message: message, color: 'green-9', position: position, icon: 'done_outline' });
  }

  return { danger, warning, success };
}
