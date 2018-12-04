export default function (input) {
  const html = document.createElement('div');
  const content = input.trim();
  html.innerHTML = content;

  try {
    const template = html.querySelector('template');
    const script = html.querySelector('script');
    const styles = Array.prototype.slice.call(html.querySelectorAll('style')).map(n => n.innerHTML);

    if (!template && !script && !styles.length) {
      return {
        content,
        script: content,
      };
    }

    return {
      content: /<\/script>$/g.test(content) ? content : (`${content}\n</script>`),
      template: template ? template.innerHTML : '',
      script: script ? script.innerHTML : '',
      styles,
    };
  } catch (error) {
    return { error };
  }
}