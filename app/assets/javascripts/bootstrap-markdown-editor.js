/*!
 * Bootstrap Markdown Editor v1.0.0 (https://github.com/inacho/bootstrap-markdown-editor)
 * Copyright 2015 Ignacio de Tomás <nacho@inacho.es>
 * Licensed under MIT (https://github.com/inacho/bootstrap-markdown-editor/blob/master/LICENSE)
 */

! function(a) {
  "use strict";

  function b(b, c, d, e, f) {
    f.show();
    var g = new FormData,
      h = 0;
    for (h = 0; h < c.length; h++) g.append("file" + h, c[h]);
    a.ajax({
      url: b,
      type: "POST",
      contentType: !1,
      data: g,
      processData: !1,
      cache: !1,
      dataType: "json"
    }).done(function(a) {
      var b = "";
      a.length > 1 && (b = "\n");
      for (var c = 0; c < a.length; c++) e.insertSnippet(d, "![](" + a[c] + ")" + b)
    }).always(function() {
      f.hide()
    })
  }

  function c(b) {
    var c, d = a(window).height(),
      e = b.offset().top;
    d > e && (c = d - e, b.css("height", c + "px"))
  }

  function d(a, b) {
    a.commands.addCommand({
      name: "bold",
      bindKey: {
        win: "Ctrl-B",
        mac: "Command-B"
      },
      exec: function(a) {
        var c = a.session.getTextRange(a.getSelectionRange());
        "" === c ? b.insertSnippet(a, "**${1:text}**") : b.insertSnippet(a, "**" + c + "**")
      },
      readOnly: !1
    }), a.commands.addCommand({
      name: "italic",
      bindKey: {
        win: "Ctrl-I",
        mac: "Command-I"
      },
      exec: function(a) {
        var c = a.session.getTextRange(a.getSelectionRange());
        "" === c ? b.insertSnippet(a, "*${1:text}*") : b.insertSnippet(a, "*" + c + "*")
      },
      readOnly: !1
    }), a.commands.addCommand({
      name: "link",
      bindKey: {
        win: "Ctrl-K",
        mac: "Command-K"
      },
      exec: function(a) {
        var c = a.session.getTextRange(a.getSelectionRange());
        "" === c ? b.insertSnippet(a, "[${1:text}](http://$2)") : b.insertSnippet(a, "[" + c + "](http://$1)")
      },
      readOnly: !1
    })
  }

  function e(a, b) {
    0 === a.getCursorPosition().column ? (a.navigateLineStart(), a.insert(b + " ")) : (a.navigateLineStart(), a.insert(b + " "), a.navigateLineEnd())
  }

  function f(b, c) {
    var d = "";
    return d += '<div class="md-loading"><span class="md-icon-container"><span class="md-icon"></span></span></div>', d += '<div class="md-toolbar">', d += '<div class="btn-toolbar">', d += '<div class="btn-group">', d += '<button type="button" data-mdtooltip="tooltip" title="' + c.label.btnHeader1 + '" class="md-btn btn btn-sm btn-default" data-btn="h1">H1</button>', d += '<button type="button" data-mdtooltip="tooltip" title="' + c.label.btnHeader2 + '" class="md-btn btn btn-sm btn-default" data-btn="h2">H2</button>', d += '<button type="button" data-mdtooltip="tooltip" title="' + c.label.btnHeader3 + '" class="md-btn btn btn-sm btn-default" data-btn="h3">H3</button>', d += "</div>", d += '<div class="btn-group">', d += '<button type="button" data-mdtooltip="tooltip" title="' + c.label.btnBold + '" class="md-btn btn btn-sm btn-default" data-btn="bold"><span class="glyphicon glyphicon-bold"></span></button>', d += '<button type="button" data-mdtooltip="tooltip" title="' + c.label.btnItalic + '" class="md-btn btn btn-sm btn-default" data-btn="italic"><span class="glyphicon glyphicon-italic"></span></button>', d += "</div>", d += '<div class="btn-group">', d += '<button type="button" data-mdtooltip="tooltip" title="' + c.label.btnLink + '" class="md-btn btn btn-sm btn-default" data-btn="link"><span class="glyphicon glyphicon-link"></span></button>', d += '<button type="button" data-mdtooltip="tooltip" title="' + c.label.btnImage + '" class="md-btn btn btn-sm btn-default" data-btn="image"><span class="glyphicon glyphicon-picture"></span></button>', c.imageUpload === !0 && (d += '<button type="button" data-mdtooltip="tooltip" title="' + c.label.btnUpload + '" class="btn btn-sm btn-default md-btn-file"><span class="glyphicon glyphicon-upload"></span><input class="md-input-upload" type="file" multiple accept=".jpg,.jpeg,.png,.gif"></button>'), d += "</div>", c.fullscreen === !0 && (d += '<div class="btn-group pull-right">', d += '<button type="button" class="md-btn btn btn-sm btn-default" data-btn="fullscreen"><span class="glyphicon glyphicon-fullscreen"></span> ' + c.label.btnFullscreen + "</button>", d += "</div>"), c.preview === !0 && (d += '<div class="btn-group pull-right">', d += '<button type="button" class="md-btn btn btn-sm btn-default btn-edit active" data-btn="edit"><span class="glyphicon glyphicon-pencil"></span> ' + c.label.btnEdit + "</button>", d += '<button type="button" class="md-btn btn btn-sm btn-default btn-preview" data-btn="preview"><span class="glyphicon glyphicon-eye-open"></span> ' + c.label.btnPreview + "</button>", d += "</div>"), d += "</div>", d += "</div>", d += '<div class="md-editor">' + a.trim(b) + "</div>", d += '<div class="md-preview" style="display:none"></div>'
  }
  var g = {
    init: function(g) {
      var h = a.extend(!0, {}, a.fn.markdownEditor.defaults, g),
        i = this,
        j = !1,
        k = !1;
      i.addClass("md-container").html(f(this.text(), h)), "function" == typeof a().tooltip && i.find('[data-mdtooltip="tooltip"]').tooltip({
        container: "body"
      });
      var l = i.find(".md-editor"),
        m = i.find(".md-preview"),
        n = i.find(".md-loading");
      i.css({
        width: h.width
      }), l.css({
        width: h.width,
        height: h.height,
        fontSize: h.fontSize
      }), m.css({
        width: h.width,
        height: h.height
      });
      var o, p = ace.edit(l[0]);
      return p.setTheme("ace/theme/" + h.theme), p.getSession().setMode("ace/mode/markdown"), p.getSession().setUseWrapMode(!0), p.setHighlightActiveLine(!0), p.setShowPrintMargin(!0), p.renderer.setShowGutter(!0), ace.config.loadModule("ace/ext/language_tools", function() {
        o = ace.require("ace/snippets").snippetManager, d(p, o)
      }), h.imageUpload && (i.find(".md-input-upload").on("change", function() {
        var c = a(this).get(0).files;
        c.length && b(h.uploadPath, a(this).get(0).files, p, o, n)
      }), i.on("dragenter", function(a) {
        a.stopPropagation(), a.preventDefault()
      }), i.on("dragover", function(a) {
        a.stopPropagation(), a.preventDefault()
      }), i.on("drop", function(a) {
        a.preventDefault();
        var c = a.originalEvent.dataTransfer.files;
        b(h.uploadPath, c, p, o, n)
      })), h.fullscreen === !0 && a(window).resize(function() {
        k === !0 && c(j === !1 ? l : m)
      }), i.find(".md-btn").click(function() {
        var b = a(this).data("btn"),
          d = p.session.getTextRange(p.getSelectionRange());
        "h1" === b ? e(p, "#") : "h2" === b ? e(p, "##") : "h3" === b ? e(p, "###") : "bold" === b ? p.execCommand("bold") : "italic" === b ? p.execCommand("italic") : "link" === b ? p.execCommand("link") : "image" === b ? "" === d ? o.insertSnippet(p, "![${1:text}](http://$2)") : o.insertSnippet(p, "![" + d + "](http://$1)") : "edit" === b ? (j = !1, m.hide(), l.show(), i.find(".btn-edit").addClass("active"), i.find(".btn-preview").removeClass("active"), k === !0 && c(l)) : "preview" === b ? (j = !0, m.html('<p style="text-align:center; font-size:16px">' + h.label.loading + "...</p>"), h.onPreview(p.getSession().getValue(), function(a) {
          m.html(a)
        }), l.hide(), m.show(), i.find(".btn-preview").addClass("active"), i.find(".btn-edit").removeClass("active"), k === !0 && c(m)) : "fullscreen" === b && (k === !0 ? (k = !1, a("body, html").removeClass("md-body-fullscreen"), i.removeClass("md-fullscreen"), l.css("height", h.height), m.css("height", h.height)) : (k = !0, a("body, html").addClass("md-body-fullscreen"), i.addClass("md-fullscreen"), c(j === !1 ? l : m)), p.resize()), p.focus()
      }), this
    },
    content: function() {
      var a = ace.edit(this.find(".md-editor")[0]);
      return a.getSession().getValue()
    }
  };
  a.fn.markdownEditor = function(b) {
    return g[b] ? g[b].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof b && b ? void a.error("Method " + b + " does not exist on jQuery.markdownEditor") : g.init.apply(this, arguments)
  }, a.fn.markdownEditor.defaults = {
    width: "100%",
    height: "400px",
    fontSize: "14px",
    theme: "tomorrow",
    fullscreen: !0,
    imageUpload: !1,
    uploadPath: "",
    preview: !1,
    onPreview: function(a, b) {
      b(a)
    },
    label: {
      btnHeader1: "Header 1",
      btnHeader2: "Header 2",
      btnHeader3: "Header 3",
      btnBold: "Bold",
      btnItalic: "Italic",
      btnLink: "Link",
      btnImage: "Insert image",
      btnUpload: "Uplaod image",
      btnEdit: "",
      btnPreview: "",
      btnFullscreen: "",
      loading: "Loading"
    }
  }
}(jQuery);