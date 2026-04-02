export function getHint(prompt: string) {
  const p = prompt.toLowerCase();

  return {
    isCoding: /code|function|bug|error|program|python|java/.test(p),
    isMath: /solve|equation|calculate|math|number/.test(p),
    isSimple: p.length < 25,
  };
}