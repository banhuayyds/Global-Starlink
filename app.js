new Vue({
  el: '#app',
  data: {
    categories: CATEGORIES,
    sb: SUPABASE,
    currentPage: 'home',
    currentCategory: null,
    scrolled: false,
    mobileMenu: false,
    comments: [],
    commentsLoading: false,
    commentForm: {
      nickname: '',
      email: '',
      content: ''
    },
    commentSubmitting: false,
    commentStatus: 'idle'
  },
  computed: {
    totalApps: function () {
      return this.categories.reduce(function (sum, cat) {
        return sum + cat.apps.length
      }, 0)
    },
    currentYear: function () {
      return new Date().getFullYear()
    },
    appGroups: function () {
      if (!this.currentCategory) return null
      var apps = this.currentCategory.apps
      if (!apps.length) return null
      var useGroup = apps.some(function (a) { return a._group })
      var useTags = !useGroup && apps.some(function (a) { return a.tags && a.tags.length === 1 })
      if (!useGroup && !useTags) return null
      var groups = []
      var map = {}
      apps.forEach(function (app) {
        var g = useGroup ? (app._group || '其他') : ((app.tags && app.tags[0]) || '其他')
        if (!map[g]) {
          map[g] = { name: g, id: 'grp-' + groups.length, apps: [] }
          groups.push(map[g])
        }
        map[g].apps.push(app)
      })
      if (groups.length <= 1) return null
      return groups
    }
  },
  watch: {
    currentPage: function () {
      var self = this
      if (self.currentPage === 'home') {
        self.$nextTick(function () { self.observeHome() })
      }
    }
  },
  mounted: function () {
    var self = this

    var saved = localStorage.getItem('commentUser')
    if (saved) {
      try {
        var user = JSON.parse(saved)
        self.commentForm.nickname = user.nickname || ''
        self.commentForm.email = user.email || ''
      } catch (e) { /* ignore */ }
    }

    self.handleRoute()
    window.addEventListener('hashchange', function () { self.handleRoute() })
    window.addEventListener('scroll', function () { self.scrolled = window.scrollY > 50 })
  },
  methods: {
    handleRoute: function () {
      var hash = window.location.hash.replace('#/', '').replace('#', '')
      var self = this
      var found = null
      self.categories.forEach(function (c) {
        if (c.id === hash) found = c
      })
      if (found) {
        self.currentPage = found.id
        self.currentCategory = found
        self.comments = []
        self.commentStatus = 'idle'
        self.fetchComments()
        window.scrollTo(0, 0)
      } else {
        self.currentPage = 'home'
        self.currentCategory = null
        self.$nextTick(function () { self.observeHome() })
      }
    },

    goHome: function () {
      window.location.hash = '#/'
    },

    scrollToTop: function () {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },

    toggleMenu: function () {
      this.mobileMenu = !this.mobileMenu
    },

    closeMenu: function () {
      this.mobileMenu = false
    },

    // ---- Comments ----

    fetchComments: function () {
      var self = this
      if (self.sb.url === 'YOUR_SUPABASE_URL') {
        self.commentsLoading = false
        return
      }
      self.commentsLoading = true
      var url = self.sb.url + '/rest/v1/comments?category=eq.' + self.currentPage + '&order=created_at.desc&limit=100'
      fetch(url, {
        headers: {
          'apikey': self.sb.key,
          'Authorization': 'Bearer ' + self.sb.key
        }
      })
        .then(function (res) { return res.json() })
        .then(function (data) {
          self.comments = Array.isArray(data) ? data : []
          self.commentsLoading = false
        })
        .catch(function () {
          self.comments = []
          self.commentsLoading = false
        })
    },

    submitComment: function () {
      var self = this
      var nick = (self.commentForm.nickname || '').trim()
      var email = (self.commentForm.email || '').trim()
      var content = (self.commentForm.content || '').trim()
      if (!nick || !email || !content) return

      if (self.sb.url === 'YOUR_SUPABASE_URL') {
        alert('请先在 data.js 中配置 Supabase 信息')
        return
      }

      self.commentSubmitting = true
      fetch(self.sb.url + '/rest/v1/comments', {
        method: 'POST',
        headers: {
          'apikey': self.sb.key,
          'Authorization': 'Bearer ' + self.sb.key,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify({
          nickname: nick,
          email: (self.commentForm.email || '').trim(),
          content: content,
          category: self.currentPage
        })
      })
        .then(function (res) {
          if (res.ok) return res.json()
          throw new Error('failed')
        })
        .then(function (rows) {
          if (rows && rows.length) {
            self.comments.unshift(rows[0])
          } else {
            self.comments.unshift({
              id: Date.now(),
              nickname: nick,
              content: content,
              created_at: new Date().toISOString()
            })
          }
          localStorage.setItem('commentUser', JSON.stringify({
            nickname: self.commentForm.nickname,
            email: self.commentForm.email
          }))
          self.commentForm.content = ''
          self.commentSubmitting = false
          self.commentStatus = 'success'
          setTimeout(function () { self.commentStatus = 'idle' }, 3000)
        })
        .catch(function () {
          self.commentSubmitting = false
          self.commentStatus = 'error'
          setTimeout(function () { self.commentStatus = 'idle' }, 3000)
        })
    },

    formatTime: function (iso) {
      if (!iso) return ''
      var d = new Date(iso)
      var pad = function (n) { return n < 10 ? '0' + n : '' + n }
      return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) +
        ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes())
    },

    getAvatarColor: function (name) {
      var hash = 0
      for (var i = 0; i < (name || '').length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash)
      }
      var colors = ['#f472b6', '#a78bfa', '#fb7185', '#f9a8d4', '#c084fc', '#818cf8', '#e879a8', '#f0abfc']
      return colors[Math.abs(hash) % colors.length]
    },

    copyCode: function (text, e) {
      var btn = e.target
      navigator.clipboard.writeText(text).then(function () {
        btn.textContent = '已复制'
        btn.classList.add('copied')
        setTimeout(function () {
          btn.textContent = '复制'
          btn.classList.remove('copied')
        }, 1500)
      })
    },

    scrollToGroup: function (id) {
      var el = document.getElementById(id)
      if (!el) return
      var navBar = document.querySelector('.group-nav-bar')
      var navH = navBar ? navBar.offsetHeight : 0
      var top = el.getBoundingClientRect().top + window.scrollY - 70 - navH - 8
      window.scrollTo({ top: top, behavior: 'smooth' })
    },

    observeHome: function () {
      var cards = document.querySelectorAll('.category-card')
      if (!cards.length) return
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible')
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.1 }
      )
      cards.forEach(function (card) { observer.observe(card) })
    }
  }
})
