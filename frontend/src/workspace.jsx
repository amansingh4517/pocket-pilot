import React, { useEffect, useState } from "react";
import { Brand } from "./Brand";
import { api } from "./api";
import {
  categories,
  Editor,
  Entries,
  label,
  money,
  ratings,
} from "./transactions";

function Overview({ data, edit, showAll }) {
  const { summary, breakdown, recent, satisfaction } = data;
  return (
    <>
      <section className="metrics">
        {[
          ["Savings", summary.savings],
          ["Total income", summary.totalIncome],
          ["Total expenses", summary.totalExpenses],
        ].map(([title, amount]) => (
          <article key={title}>
            <span>{title}</span>
            <strong>{money(amount)}</strong>
          </article>
        ))}
      </section>
      <div className="grid">
        <section className="panel">
          <header>
            <h2>Spending by category</h2>
          </header>
          {breakdown.length ? (
            breakdown.map((item) => (
              <div className="category" key={item.category || "none"}>
                <div>
                  <b>{label(item.category)}</b>
                  <span>
                    {money(item.total)} · {item.percentage}%
                  </span>
                </div>
                <progress
                  max="100"
                  value={item.percentage}
                  aria-label={label(item.category)}
                />
              </div>
            ))
          ) : (
            <p className="empty">
              Add an expense to see your spending breakdown.
            </p>
          )}
        </section>
        <section className="panel">
          <h2>Purchase satisfaction</h2>
          {satisfaction.length ? (
            ratings.map((rating) => {
              const item = satisfaction.find((i) => i.satisfaction === rating);
              return (
                <div className="rating" key={rating}>
                  <span>{label(rating)}</span>
                  <small>{item?.count || 0} rated</small>
                  <b>{money(item?.total || 0)}</b>
                </div>
              );
            })
          ) : (
            <p className="empty">
              Rate an expense to see how you feel about your purchases.
            </p>
          )}
        </section>
      </div>
      <section className="panel">
        <header>
          <h2>Recent transactions</h2>
          <button className="link" onClick={showAll}>
            View all
          </button>
        </header>
        <Entries rows={recent} edit={edit} />
      </section>
    </>
  );
}

function Ledger({ rows, edit }) {
  const [query, search] = useState("");
  const [category, choose] = useState("");
  const [type, chooseType] = useState("");
  const filtered = rows.filter(
    (row) =>
      (!category || row.category === category) &&
      (!type || row.type === type) &&
      (row.purpose || "").toLowerCase().includes(query.trim().toLowerCase()),
  );
  return (
    <section className="panel">
      <div className="filters">
        <label>
          Search purpose
          <input
            type="search"
            value={query}
            onChange={(e) => search(e.target.value)}
            placeholder="Find a transaction"
          />
        </label>
        <label>
          Type
          <select value={type} onChange={(e) => chooseType(e.target.value)}>
            <option value="">All types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>
        <label>
          Category
          <select value={category} onChange={(e) => choose(e.target.value)}>
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {label(c)}
              </option>
            ))}
          </select>
        </label>
      </div>
      <Entries rows={filtered} edit={edit} />
    </section>
  );
}

export function Workspace({ user, onLogout }) {
  const [page, navigate] = useState("Overview");
  const [revision, refresh] = useState(0);
  const [result, setResult] = useState(null);
  const [editor, edit] = useState(null);
  const [notice, notify] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    const options = { signal: controller.signal };
    async function load() {
      try {
        let data;
        if (page === "Overview") {
          const [summary, breakdown, recent, satisfaction] = await Promise.all(
            ["summary", "by-category", "recent", "satisfaction"].map((path) =>
              api("dashboard/" + path, options),
            ),
          );
          data = { summary, breakdown, recent, satisfaction };
        } else data = await api("transactions", options);
        if (!controller.signal.aborted) setResult({ page, revision, data });
      } catch (error) {
        if (!controller.signal.aborted)
          setResult({ page, revision, error: error.message });
      }
    }
    load();
    return () => controller.abort();
  }, [page, revision]);
  const current =
    result?.page === page && result.revision === revision ? result : null;
  return (
    <>
      <div className="top">
        <Brand />
        <nav aria-label="Main navigation">
          {["Overview", "Transactions"].map((p) => (
            <button
              key={p}
              aria-current={page === p ? "page" : undefined}
              onClick={() => {
                navigate(p);
                notify("");
              }}
            >
              {p}
            </button>
          ))}
        </nav>
        <button className="link" onClick={onLogout}>
          Sign out
        </button>
      </div>
      <main className="dashboard">
        <p className="eyebrow">{user.name}’s spending journal</p>
        <header className="title">
          <h1>{page}</h1>
          <button onClick={() => edit({})}>+ Add transaction</button>
        </header>
        {notice && <p role="status">{notice}</p>}
        {!current ? (
          <p role="status">Loading {page.toLowerCase()}…</p>
        ) : current.error ? (
          <div role="alert">
            {current.error}{" "}
            <button className="link" onClick={() => refresh((v) => v + 1)}>
              Retry
            </button>
          </div>
        ) : page === "Overview" ? (
          <Overview
            data={current.data}
            edit={edit}
            showAll={() => navigate("Transactions")}
          />
        ) : (
          <Ledger rows={current.data} edit={edit} />
        )}
      </main>
      {editor && (
        <Editor
          row={editor}
          close={() => edit(null)}
          saved={() => {
            edit(null);
            notify("Journal updated.");
            refresh((v) => v + 1);
          }}
        />
      )}
    </>
  );
}
