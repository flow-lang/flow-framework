import { defer } from '../utils'

export default class VirtualDOM {
  // Static Methods ============================================================
  //
  static isText (node) {
    return typeof node === 'string' ||
      typeof node === 'number' ||
      typeof node === 'boolean'
  }

  //
  static isVirtualNode (node) {
    return typeof node === 'object' && node.attrs && node.children
  }

  //
  static isComponent (node) {
    return typeof node === 'function'
  }

  // Constructor ===============================================================
  //
  constructor ($root) {
    this.$root = $root
    this.vPrev = null

    // Remove any children on the root DOM node when a new VDOM is created, this
    // ensures nothing interferes with the diffing process.
    while (this.$root.firstChild) {
      this.$root.removeChild(this.$root.firstChild)
    }
  }

  // Public Methods ============================================================
  //
  update (vCurr, vPrev, $root, index = 0) {
    // When update is first called it is just given the new virtual tree to diff,
    // but it is then called recursively on each child element with the appropriate
    // previous tree and root node. Because of this, we default to the original
    // previous tree and the global root DOM node. We don't use the default
    // assignment in the function arguments (like with index = 0) because I don't
    // think you can access `this` from function arguments.
    vPrev = vPrev || this.vPrev
    $root = $root || this.$root

    const $el = $root.childNodes[index]

    // There is no previous tree.
    if (!vPrev || !$el) {
      this._append($root, vCurr)

    // There is no new tree. This probably means we've
    // removed a node (or the entire tree) from the previous
    // tree so let's remove it from the dom.
    } else if (!vCurr) {
      $el && this._remove($el)

    // There is a type mismatch between the previous and current
    // trees. For example the old tree was an object representing
    // a dom node, and now it is a string representing a text node.
    } else if (typeof vPrev !== typeof vCurr) {
      this._replace($root, $el, vCurr)

    // The current nodes are the same type AND they are both text-like.
    // This means we can do a simple equality comparison and replace
    // them if necessary.
    } else if (VirtualDOM.isText(vPrev) && VirtualDOM.isText(vCurr)) {
      if (vPrev !== vCurr) {
        this._replace($root, $el, vCurr)
      }

    // The current nodes are the same type AND they are both virtual nodes.
    // Here we perform a more involved diff to determine what and how
    // to update.
    } else if (VirtualDOM.isVirtualNode(vPrev) && VirtualDOM.isVirtualNode(vCurr)) {
      // We can safely assume if the tag has changed that the overall
      // structure of the sub tree has changed too, and so we can
      // replace the node and its children without performing any further
      // diff.
      if (vPrev.tag !== vCurr.tag) {
        this._replace($root, $el, vCurr)

      // Otherwise...
      } else {
        // First we diff the attributes on the node.
        for (let i = 0; i < vPrev.attrs.length || i < vCurr.attrs.length; i++) {
          const prevAttr = vPrev.attrs[i]
          const currAttr = vCurr.attrs[i]

          // This is somewhat ineffecient. If the order of attributes
          // is different but both the previous and current node has
          // the same attributes, they will be removed and then re-added.
          if (!currAttr) {
            $el.removeAttribute(prevAttr.name)
          } else {
            $el.setAttribute(currAttr.name, currAttr.value)
          }
        }
      }

      // Then iterate each of this node's children and recursively call
      // the render function.
      for (let i = 0; i < Math.max(vPrev.children.length, vCurr.children.length); i++) {
        this.update(vCurr.children[i], vPrev.children[i], $el, i)
      }

    // Components are functions that return some virtual dom node(s), so they
    // need to be handled differently. Currently we don't actually support
    // components, but this is the foundation to do so.
    } else if (VirtualDOM.isComponent(vPrev) && VirtualDOM.isComponent(vCurr)) {

    }

    // Update the previous tree so we can perform the right diff on subsequent
    // calls to update.
    this.vPrev = vCurr
  }

  // Private Methods ===========================================================
  //
  _create (node) {
    if (VirtualDOM.isText(node)) {
      return document.createTextNode(`${node}`)
    }

    // VirtualDOM.isVirtualNode performs the necessary checks to make sure the
    // object has the necessary fields (type, attrs, children) so we can safely
    // assume everything exists if it passes that check.
    if (VirtualDOM.isVirtualNode(node)) {
      // We assume the tag is valid, some checks
      // may be useful here...
      const $el = document.createElement(node.tag)

      for (const attr of node.attrs) {
        $el.setAttribute(attr.name, attr.value)
      }

      // Recursively create all the children
      // of this node
      for (const elem of node.children) {
        $el.appendChild(this._create(elem))
      }

      return $el
    }

    // In the future we might want to handle custom omponent functions, but
    // ight now we just return an empty node.
    if (VirtualDOM.isComponent(node)) {
      return document.createTextNode('')
    }

    // If some invalid object was passed in, just create a blank DOM node.
    return document.createTextNode('')
  }

  //
  _replace ($root, $el, node) {
    $root.replaceChild(this._create(node), $el)
  }

  //
  _append ($root, node) {
    $root.appendChild(this._create(node))
  }

  //
  _remove ($el) {
    defer(() => $el.remove())
  }
}
