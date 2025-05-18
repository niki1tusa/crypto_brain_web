// Типы для Google Translate API
export interface GoogleTranslateConfig {
  pageLanguage?: string;
  includedLanguages?: string;
  layout?: google.translate.TranslateElementLayout;
  autoDisplay?: boolean;
  multilanguagePage?: boolean;
}

export namespace google {
  export namespace translate {
    export enum TranslateElementLayout {
      HORIZONTAL = 'HORIZONTAL',
      VERTICAL = 'VERTICAL',
      AUTO = 'AUTO',
      SIMPLE = 'SIMPLE'
    }
    
    export interface TranslateElement {
      new (element: HTMLElement, options: GoogleTranslateConfig): any;
    }
    
    export interface TranslateInstance {
      TranslateElement: TranslateElement;
      InlineLayout: {
        HORIZONTAL: TranslateElementLayout.HORIZONTAL;
        VERTICAL: TranslateElementLayout.VERTICAL;
        AUTO: TranslateElementLayout.AUTO;
        SIMPLE: TranslateElementLayout.SIMPLE;
      };
    }
  }
}