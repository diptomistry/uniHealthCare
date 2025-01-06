class ContentTypeConfig {
    constructor(title, showControls, defaultForm, validateForm) {
      this.title = title;
      this.showControls = showControls;
      this.defaultForm = defaultForm;
      this.validateForm = validateForm;
    }
  }
  
  export class ContentFactory {
    static createContentConfig(contentType) {
      switch (contentType) {
        case 'blog':
          return new ContentTypeConfig(
            'BLOGS',
            true,
            {
              title: '',
              description: '',
              img: '',
              isBlog: true,
              isQuote: false
            },
            (form) => {
              if (!form.title || !form.description) {
                throw new Error('Blog posts require both title and description');
              }
              return true;
            }
          );
  
        case 'service':
          return new ContentTypeConfig(
            'SERVICES',
            true,
            {
              title: '',
              description: '',
              img: '',
              isBlog: false,
              isQuote: false
            },
            (form) => {
              if (!form.title || !form.description) {
                throw new Error('Services require both title and description');
              }
              return true;
            }
          );
  
        case 'quote':
          return new ContentTypeConfig(
            'QUOTES',
            false,
            {
              title: '',
              description: '',
              img: '',
              isBlog: false,
              isQuote: true
            },
            (form) => {
              if (!form.description) {
                throw new Error('Quotes require a description');
              }
              return true;
            }
          );
  
        default:
          throw new Error(`Unsupported content type: ${contentType}`);
      }
    }
  }