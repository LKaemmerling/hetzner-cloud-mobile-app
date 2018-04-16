import {Component} from '@angular/core';
import {LoadingController, NavController, NavParams, ViewController} from "ionic-angular";
import {ServerApiProvider} from "../../../../modules/hetzner-cloud-api/server-api/server-api";

import RFB from '@novnc/novnc/core/rfb.js';
import {Server} from "../../../../modules/hetzner-cloud-data/servers/server";

/**
 * Keytable from novnc
 */
var KeyTable = require('@novnc/novnc/core/input/keysym.js').default;
/**
 * Keysymbols from novnc
 */
var keysyms = require('@novnc/novnc/core/input/keysymdef.js').default;
/**
 * The Keyboard from novnc
 */
var Keyboard = require('@novnc/novnc/core/input/keyboard.js').default;

/**
 * This modal makes it possible to interact with your server trougth the vnc console
 */
@Component({
  selector: 'modal-console',
  templateUrl: 'console.html'
})
export class consoleModal {
  /**
   * The server
   */
  public server: Server;
  /**
   * The novonc object
   */
  public rfb;
  /**
   * The Input
   */
  public input: string;
  /**
   * The default keyboard input
   */
  protected defaultKeyboardinputLen: 100;
  /**
   * Last keyboard input
   */
  protected lastKeyboardinput: string;
  /**
   * Is it a touch keyboard?
   */
  protected touchKeyboard;

  /**
   * Constructor
   * @param {ViewController} viewCtrl
   * @param {ServerApiProvider} serverApiProvider
   * @param {NavParams} navParams
   * @param {NavController} navCtrl
   * @param {LoadingController} loadingCtrl
   */
  constructor(protected viewCtrl: ViewController, protected serverApiProvider: ServerApiProvider, protected navParams: NavParams, protected navCtrl: NavController, protected loadingCtrl: LoadingController) {
    this.server = navParams.get('server');
    this.serverApiProvider.requestConsole(this.server.id).then((response) => {
      this.rfb = new RFB(document.getElementById('console_container'), response['wss_url'], {credentials: {password: response['password']}});
      this.rfb.viewOnly = false;
      document.getElementById("noVNC_keyboardinput")
        .addEventListener('submit', function () {
          return false;
        });
      document.getElementById("noVNC_keyboardinput")
        .addEventListener('input', (event) => {
          this.keyInput(event);
        });
      document.getElementById("noVNC_keyboardinput")
        .addEventListener('focus', (event) => {
          this.onfocusVirtualKeyboard(event)
        });
      document.getElementById("noVNC_keyboardinput")
        .addEventListener('blur', (event) => {
          this.onblurVirtualKeyboard(event)
        });
      document.getElementById('console_container').addEventListener('click', (event) => {
        this.keyboard();
      });
      document.getElementById('console_container').addEventListener('touchstart', (event) => {
        this.keyboard();
      });
      this.touchKeyboard = new Keyboard(document.getElementById('noVNC_keyboardinput'));
      this.touchKeyboard.onkeyevent = (keysym, code, down) => {
        this.keyevent(keysym, code, down);
      };
      this.touchKeyboard.grab();
    });
  }

  /**
   * Thrown when there is something tipped or typed
   * @param keysym
   * @param code
   * @param down
   */
  keyevent(keysym, code, down) {
    if (!this.rfb) return;

    this.rfb.sendKey(keysym, code, down);
  }

  /**
   *  Displays the virtual keyboard
   */
  protected showVirtualKeyboard() {
    var input = <HTMLInputElement>document.getElementById('noVNC_keyboardinput');

    if (document.activeElement == input) return;

    input.focus();

    try {
      var l = input.value.length;
      // Move the caret to the end
      input.setSelectionRange(l, l);
    } catch (err) {
    } // setSelectionRange is undefined in Google Chrome
  }

  /**
   * Onblur Virtual Keyboard
   * @param event
   */
  protected onblurVirtualKeyboard(event) {
    document.getElementById('noVNC_keyboard_button')
      .classList.remove("noVNC_selected");
    if (this.rfb) {
      this.rfb.focusOnClick = true;
    }
  }

  /**
   * On Focus Virtual Keyboard
   * @param event
   */
  protected onfocusVirtualKeyboard(event) {
    document.getElementById('noVNC_keyboard_button')
      .classList.add("noVNC_selected");
    if (this.rfb) {
      this.rfb.focusOnClick = false;
    }
  }

  /**
   * Hide the Virtual Keyboard
   */
  protected hideVirtualKeyboard() {
    var input = document.getElementById('noVNC_keyboardinput');

    if (document.activeElement != input) return;

    input.blur();
  }

  /**
   * Toggle the virtual keyboard
   */
  public keyboard() {
    if (document.getElementById('noVNC_keyboard_button')
      .classList.contains("noVNC_selected")) {
      this.hideVirtualKeyboard();
    } else {
      this.showVirtualKeyboard();
    }

  }

  /**
   * reset the keyboard to the default
   */
  protected resetKeyboard() {
    var kbi = <HTMLInputElement>document.getElementById('noVNC_keyboardinput');
    kbi.value = new Array(this.defaultKeyboardinputLen).join("_");
    this.lastKeyboardinput = kbi.value;
  }

  /**
   * When a key in pressed
   * @param event
   */
  public keyInput(event) {
    var newValue = event.target.value;
    if (!this.lastKeyboardinput) {
      this.resetKeyboard();
    }
    var oldValue = this.lastKeyboardinput;
    var newLen;
    try {
      // Try to check caret position since whitespace at the end
      // will not be considered by value.length in some browsers
      newLen = Math.max(event.target.selectionStart, newValue.value.length);
    } catch (err) {
      // selectionStart is undefined in Google Chrome
      newLen = newValue.length;
    }
    var oldLen = oldValue.length;

    var backspaces;
    var inputs = newLen - oldLen;
    if (inputs < 0) {
      backspaces = -inputs;
    } else {
      backspaces = 0;
    }

    // Compare the old string with the new to account for
    // text-corrections or other input that modify existing text
    var i;
    for (i = 0; i < Math.min(oldLen, newLen); i++) {
      if (newValue.charAt(i) != oldValue.charAt(i)) {
        inputs = newLen - i;
        backspaces = oldLen - i;
        break;
      }
    }

    // Send the key events
    for (i = 0; i < backspaces; i++) {
      this.rfb.sendKey(KeyTable.XK_BackSpace, "Backspace");
    }
    for (i = newLen - inputs; i < newLen; i++) {
      this.rfb.sendKey(keysyms.lookup(newValue.charCodeAt(i)));
    }

    // Control the text content length in the keyboardinput element
    if (newLen > 2 * this.defaultKeyboardinputLen) {
      this.resetKeyboard();
    } else if (newLen < 1) {
      // There always have to be some text in the keyboardinput
      // element with which backspace can interact.
      this.resetKeyboard();
      // This sometimes causes the keyboard to disappear for a second
      // but it is required for the android keyboard to recognize that
      // text has been added to the field
      event.target.blur();
      // This has to be ran outside of the input handler in order to work
      setTimeout(event.target.focus.bind(event.target), 0);
    } else {
      this.lastKeyboardinput = newValue;
    }
  }

  /**
   * Send Crtl Alt Del to the server
   * @returns {boolean}
   */
  public sendCtrlAltDel() {
    this.rfb.sendCtrlAltDel();
    return false;
  }

  /**
   * Dismiss the modal
   */
  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
