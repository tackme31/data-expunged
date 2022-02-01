import styled from 'styled-components'

export const Container = styled.div`
  @apply text-center;

  @media (prefers-reduced-motion: no-preference) {
    .App-logo {
      margin: auto;
    }
  }

  .App-header {
    font-size: calc(10px + 2vmin);
    @apply min-h-screen flex flex-col items-center justify-center text-white;
  }

  .App-link {
    color: #61dafb;
  }

  button {
    font-size: calc(10px + 2vmin);
    margin: 5px 0;
  }
`
