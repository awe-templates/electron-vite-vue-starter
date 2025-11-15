import { vi } from 'vitest';

// Mock fs module
vi.mock('fs', () => ({
  existsSync: vi.fn(() => true),
  readFile: vi.fn(),
  writeFile: vi.fn(),
  default: { existsSync: vi.fn(() => true) },
}));

// Mock path module
vi.mock('path', () => ({
  join: vi.fn((...args: string[]) => args.join('/')),
  default: { join: vi.fn((...args: string[]) => args.join('/')) },
}));
