import React from 'react';

const RichTextArea = ({ item }) => {
    const renderHTML = () => {
        return { __html: item.customFields.textblob };
    }
    return (
        <section className="container">
            <div dangerouslySetInnerHTML={renderHTML()}></div>
        </section>
    );
}

export default RichTextArea;
