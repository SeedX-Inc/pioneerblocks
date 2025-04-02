import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, Button, TextControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
    const { selectedBooks } = attributes;

    const encodeId = (id) => btoa(`post:${id}`);
    const bookOptions = useSelect(select => {
        const books = select('core').getEntityRecords('postType', 'book', { per_page: -1 }) || [];
        return books.map(book => ({ label: book.title.rendered, value: encodeId(book.id) }));
    }, []);

    const addBook = (bookId) => {
        if (!selectedBooks.includes(bookId)) {
            setAttributes({ selectedBooks: [...selectedBooks, bookId] });
        }
    };

    const removeBook = (bookId) => {
        setAttributes({ selectedBooks: selectedBooks.filter(id => id !== bookId) });
    };

    return (
        <div {...useBlockProps({ className: 'books-list' })}>
            <InspectorControls>
                <PanelBody title={__('Select Books', 'books-list')} initialOpen={true}>
                    <SelectControl
                        label={__('Add Book', 'books-list')}
                        options={[{ label: __('Select a Book', 'books-list'), value: '' }, ...bookOptions]}
                        onChange={(value) => value && addBook(value)}
                    />
                </PanelBody>
            </InspectorControls>

            <h2>{__('Selected Books', 'books-list')}</h2>
            <ul>
                {selectedBooks.map((bookId) => {
                    const book = bookOptions.find(book => book.value === bookId);
                    return (
                        <li key={bookId}>
                            {book?.label || __('Unknown Book', 'books-list')}
                            <Button isDestructive onClick={() => removeBook(bookId)}>Remove</Button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
