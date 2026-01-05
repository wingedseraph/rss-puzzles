import { type Ref } from 'vue';

export function useDragAndDrop(
  resultWords: Ref<string[]>,
  onMoveToResult: (word: string) => void,
  onMoveToSource: (word: string) => void,
) {
  const handleDragStart = (e: DragEvent, word: string, fromSource: boolean) => {
    e.dataTransfer?.setData('text/plain', `${word}|${fromSource}`);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent, target: 'source' | 'result') => {
    e.preventDefault();
    const data = e.dataTransfer?.getData('text/plain');
    if (!data) return;

    const [word, fromSourceStr] = data.split('|');
    const fromSource = fromSourceStr === 'true';

    if (!word) return;

    if (target === 'result' && fromSource) {
      onMoveToResult(word);
    } else if (target === 'source' && !fromSource) {
      onMoveToSource(word);
    } else if (target === 'result' && !fromSource) {
      const oldIndex = resultWords.value.indexOf(word);
      if (oldIndex !== -1) {
        resultWords.value.splice(oldIndex, 1);
        resultWords.value.push(word);
      }
    }
  };

  return {
    handleDragStart,
    handleDragOver,
    handleDrop,
  };
}
