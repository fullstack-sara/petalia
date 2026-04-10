import { render, cleanup, within } from "@testing-library/react";
import fc from "fast-check";
import { afterEach, test, expect } from "vitest";
import { Button } from "./Button";
import { Badge } from "./Badge";
import { Input } from "./Input";
import { Textarea } from "./Textarea";
import { Select } from "./Select";
import { Icon } from "./Icon";
import { StatCard } from "./StatCard";

afterEach(cleanup);

const nonBlank = fc.string({ minLength: 1, maxLength: 30 }).filter((s) => s.trim().length > 0);

test("Button renders as button with correct variant classes", () => {
  fc.assert(
    fc.property(
      fc.constantFrom("primary", "secondary", "ghost"),
      (variant) => {
        const { container } = render(<Button variant={variant as "primary" | "secondary" | "ghost"}>Label</Button>);
        const btn = container.querySelector("button");
        expect(btn).not.toBeNull();
        expect(btn?.className).toContain("active:scale-95");
        cleanup();
      }
    ),
    { numRuns: 100 }
  );
});

test("Badge renders its label text", () => {
  fc.assert(
    fc.property(
      nonBlank,
      fc.constantFrom("primary", "secondary", "outline"),
      (label, variant) => {
        const { container } = render(<Badge label={label} variant={variant as "primary" | "secondary" | "outline"} />);
        expect(within(container).getAllByText(label.trim()).length).toBeGreaterThan(0);
        cleanup();
      }
    ),
    { numRuns: 100 }
  );
});

test("Input renders its label text", () => {
  fc.assert(
    fc.property(
      nonBlank,
      (label) => {
        const { container } = render(<Input label={label} value="" onChange={() => {}} />);
        expect(within(container).getAllByText(label.trim()).length).toBeGreaterThan(0);
        cleanup();
      }
    ),
    { numRuns: 100 }
  );
});

test("Textarea renders its label text", () => {
  fc.assert(
    fc.property(
      nonBlank,
      (label) => {
        const { container } = render(<Textarea label={label} value="" onChange={() => {}} />);
        expect(within(container).getAllByText(label.trim()).length).toBeGreaterThan(0);
        cleanup();
      }
    ),
    { numRuns: 100 }
  );
});

test("Select renders its label and all options", () => {
  fc.assert(
    fc.property(
      nonBlank,
      fc.array(
        fc.record({ value: fc.uuid(), label: nonBlank }),
        { minLength: 1, maxLength: 5 }
      ),
      (label, options) => {
        const { container } = render(
          <Select label={label} options={options} value={options[0].value} onChange={() => {}} />
        );
        expect(within(container).getAllByText(label.trim()).length).toBeGreaterThan(0);
        options.forEach((opt) => expect(within(container).getAllByText(opt.label.trim()).length).toBeGreaterThan(0));
        cleanup();
      }
    ),
    { numRuns: 100 }
  );
});

test("Icon renders the icon name as text content", () => {
  fc.assert(
    fc.property(
      nonBlank,
      (name) => {
        const { container } = render(<Icon name={name} />);
        const span = container.querySelector(".material-symbols-outlined");
        expect(span?.textContent?.trim()).toBe(name.trim());
        cleanup();
      }
    ),
    { numRuns: 100 }
  );
});

test("StatCard renders title and value", () => {
  fc.assert(
    fc.property(
      nonBlank,
      nonBlank,
      (title, value) => {
        const { container } = render(<StatCard title={title} value={value} />);
        expect(within(container).getAllByText(title.trim()).length).toBeGreaterThan(0);
        expect(within(container).getAllByText(value.trim()).length).toBeGreaterThan(0);
        cleanup();
      }
    ),
    { numRuns: 100 }
  );
});
