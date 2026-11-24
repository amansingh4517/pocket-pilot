import React, { useEffect, useRef, useState } from "react";
import { api } from "./api";

export const categories = [
  "food",
  "travel",
  "cinema",
  "personal-care",
  "subscriptions",
  "groceries",
  "clothes",
  "stationary",
];
export const ratings = ["happy", "neutral", "regret"];
export const label = (value) =>
  value
    ? value[0].toUpperCase() + value.slice(1).replace("-", " ")
    : "Uncategorized";
export const money = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);
function dateField(date) {
  const local = new Date(date);
  local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
  return local.toISOString().slice(0, 10);
}

export function Entries({ rows, edit }) {
  if (!rows.length) return <p className="empty">No transactions to show.</p>;
  return (
    <ul className="entries">
      {rows.map((row) => (
        <li key={row._id}>
          <button className="entry" onClick={() => edit(row)}>
            <span className={"mark " + row.type} aria-hidden="true">
              {row.type === "income" ? "+" : "−"}
            </span>
            <span>
              <b>{row.purpose || label(row.category || row.type)}</b>
              <small>
                {label(row.category || row.type)} ·{" "}
                {new Date(row.date).toLocaleDateString(undefined, {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </small>
            </span>
            <strong className={row.type}>
              {row.type === "expense" ? "−" : "+"}
              {money(row.amount)}
            </strong>
          </button>
        </li>
      ))}
    </ul>
  );
}

export function Editor({ row, close, saved }) {
  const dialog = useRef(null);
  const [type, setType] = useState(row.type || "expense");
  const [deleting, setDeleting] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    dialog.current.showModal();
  }, []);
  async function submit(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    setBusy(true);
    setError("");
    try {
      if (deleting) await api("transactions/" + row._id, { method: "DELETE" });
      else {
        const body = {
          ...data,
          amount: Number(data.amount),
          category: data.category || null,
          satisfaction: (type === "expense" && data.satisfaction) || null,
          date:
            row.date && dateField(row.date) === data.date
              ? row.date
              : new Date(data.date + "T12:00:00").toISOString(),
        };
        await api(row._id ? "transactions/" + row._id : "transactions", {
          method: row._id ? "PUT" : "POST",
          body,
        });
      }
      saved();
    } catch (e) {
      setError(e.message);
      setBusy(false);
    }
  }
  return (
    <dialog
      ref={dialog}
      aria-labelledby="editor-title"
      onCancel={(e) => {
        e.preventDefault();
        if (!busy) close();
      }}
    >
      <header>
        <h2 id="editor-title">
          {deleting
            ? "Delete transaction?"
            : row._id
              ? "Edit transaction"
              : "Add transaction"}
        </h2>
        <button
          className="link"
          aria-label="Close dialog"
          disabled={busy}
          onClick={close}
        >
          ✕
        </button>
      </header>
      <form onSubmit={submit}>
        {deleting ? (
          <p>
            Delete {row.purpose || "this transaction"} for {money(row.amount)}?
            This is permanent.
          </p>
        ) : (
          <>
            <label>
              Type
              <select
                name="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </label>
            <div className="pair">
              <label>
                Amount (₹)
                <input
                  name="amount"
                  type="number"
                  min="0.01"
                  step="any"
                  defaultValue={row.amount}
                  required
                />
              </label>
              <label>
                Date
                <input
                  type="date"
                  name="date"
                  defaultValue={dateField(row.date || Date.now())}
                  required
                />
              </label>
            </div>
            <label>
              Purpose
              <input
                name="purpose"
                maxLength="200"
                defaultValue={row.purpose}
                placeholder="e.g. Lunch on campus"
              />
            </label>
            <label>
              Category
              <select name="category" defaultValue={row.category || ""}>
                <option value="">Uncategorized</option>
                {categories.map((c) => (
                  <option value={c} key={c}>
                    {label(c)}
                  </option>
                ))}
              </select>
            </label>
            {type === "expense" && (
              <label>
                How did this purchase feel?
                <select
                  name="satisfaction"
                  defaultValue={row.satisfaction || ""}
                >
                  <option value="">Unrated</option>
                  {ratings.map((r) => (
                    <option value={r} key={r}>
                      {label(r)}
                    </option>
                  ))}
                </select>
              </label>
            )}
          </>
        )}
        {error && <p role="alert">{error}</p>}
        <footer>
          {row._id && (
            <button
              type="button"
              className="link"
              disabled={busy}
              onClick={() => {
                setDeleting(!deleting);
                setError("");
              }}
            >
              {deleting ? "Back" : "Delete transaction"}
            </button>
          )}
          <button disabled={busy}>
            {busy
              ? "Please wait…"
              : deleting
                ? "Confirm delete"
                : "Save transaction"}
          </button>
        </footer>
      </form>
    </dialog>
  );
}
